import React, { useRef, useState, useEffect } from "react"
import './search.scss'
import { Input, Table, Card, Space, message } from "antd"
import { useLocation } from "react-router-dom"
import { http } from "@/util/http"
import { faPlay, faHeart } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


function Search ( props ) {
  const { Search } = Input
  // 拿到search页面的input数据
  const [ searchInput, setSearchInput ] = useState( '' )
  // 无版权的全局提示
  const [ messageApi, contextHolder ] = message.useMessage()
  const info = () => {
    messageApi.info( '抱歉，暂无版权!' )
  }
  // 在不知道音乐是否有版权之前，先放到一个checkId里面等待校验
  // const [ checkId, setCheckId ] = useState( '1454573250' )
  const { setCurId,
    setCurArtist,
    setCurTitle,
    setCurAlbumID,
    setIsPlaying,
    isValid,
    list, setList,
    listSongsId, setListSongsId
  } = props
  //处理input数据
  const handlerChange = e => {
    setSearchInput( e.target.value )
  }
  //search页面的搜索函数
  const onSearch = () => {
    loadList( searchInput )
  }
  // 获取搜索结果
  const [ songsList, setSongsList ] = useState( '' )
  const loadList = async ( value ) => {
    const res = await http.get( '/search',
      {
        params: {
          keywords: value,
          limit: 50,
          realIP: '116.25.146.177'
        }
      } )
    setSongsList( res.data.result.songs )
  }
  // 通过url传参拿到首页的输入值
  let location = useLocation()
  const query = new URLSearchParams( location.search )
  const inputValue = query.get( 'input' )
  // 拿到首页的搜索数据
  useEffect( () => {
    loadList( inputValue )
  }, [ inputValue ] )
  // 拿到最新的添加到播放列表的数据
  const curAddToList = useRef( '' )
  // 添加歌曲到播放列表
  const addToList = ( song ) => {
    curAddToList.current = song.id
    setListSongsId( song.id )
    setList( () => {
      if ( curAddToList.current !== listSongsId ) {
        return [
          ...list,
          {
            id: song.id,
            name: song.name,
            artists: song.artists[ 0 ].name,
            album: song.album.name,
            albumID: song.album.id
          }
        ]
      } else {
        return [ ...list ]
      }
    } )
  }
  // 判断有无版权，无版权则不进行歌曲信息展示，并且跳出提示,这个接口不准确，改为用url判断
  // useEffect( () => {
  //   const isValid = async ( curId ) => {
  //     const res = await http.get( '/song/url/v1',
  //       {
  //         params: {
  //           id: curId,
  //           level: "standard"
  //         }
  //       } )
  //     const data = res.data.data[ 0 ].url
  //     console.log( data )
  //     setIsSuccess( data !== null )
  //   }
  //   isValid( checkId )
  // }, [ checkId ] )

  // 延迟播放函数
  const delayPlay = async function () {
    // 注意这里必须强制变一次isPlaying状态，否则触发不了useEffect
    setIsPlaying( false )
    let play = await new Promise( () => setTimeout( () => setIsPlaying( true ), 2500 ) )
    // 播放了就把定时器清除掉
    return clearTimeout( play )
  }
  //数据处理，用于表格渲染
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: 260,
    },
    {
      title: '歌手',
      dataIndex: [ 'artists', [ 0 ], 'name' ],
      width: 220
    },
    {
      title: '专辑',
      dataIndex: [ 'album', 'name' ],
      width: 400
    },
    {
      title: '操作',
      render: ( _, record ) => (
        <Space size="middle">
          { contextHolder }
          <button className="handler"
            onClick={ () => {
              setCurId( record.id )
              // if ( isValid ) {
              setCurArtist( record.artists[ 0 ].name )
              setCurTitle( record.name )
              setCurAlbumID( record.album.id )
              delayPlay()
              // } else {
              //   info()
              // }
              // console.log( record.id )
            } }>
            <FontAwesomeIcon icon={ faPlay } title='播放' />
          </button>
          <button className="heart"
            onClick={ () => addToList( record ) }
          ><FontAwesomeIcon icon={ faHeart } title="添加到歌单" /></button>
        </Space>
      ),
    }
  ]

  return (
    <div className="search">
      <Card className="searchCompo">
        <Search
          className="searchBar"
          placeholder="输入想找的音乐"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={ onSearch }
          type="text"
          value={ searchInput }
          onChange={ handlerChange }
        />
        <Table
          className="table"
          size="middle"
          rowKey='id'
          columns={ columns }
          dataSource={ songsList }
          pagination={
            {
              pageSize: 10,
              total: 50,
              position: [ "none", "bottomCenter" ]
            }
          }
          bordered
        />
      </Card>
    </div>
  )
}
export default Search
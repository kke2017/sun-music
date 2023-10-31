import React from "react"
import './search.scss'
import { Input, Table, Card, Space, Button } from "antd"
import Player from "@/components/player/player"
import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { http } from "@/util/http"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
function SearchRes ( props ) {
  const { Search } = Input
  // 拿到search页面的input数据
  const [ searchInput, setSearchInput ] = useState( '' )
  //实现播放歌曲功能,修改id
  // const [ curId, setCurId ] = useState( '1454573250' )
  // //歌曲的基本信息显示：封面，作者，标题
  // const [ curArtist, setCurArtist ] = useState( "乃木坂46" )
  // const [ curTitle, setCurTitle ] = useState( "帰り道は遠回りしたくなる" )
  // const [ curAlbumID, setCurAlbumID ] = useState( '90692083' )
  const { curId, setCurId, curArtist, setCurArtist, curTitle, setCurTitle, curAlbumID, setCurAlbumID } = props
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
          limit: 10
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
  //数据处理，用于表格渲染
  const columns = [
    {
      key: 'name',
      title: '标题',
      dataIndex: 'name',
      width: 200,
    },
    {
      key: 'artist',
      title: '歌手',
      dataIndex: [ 'artists', [ 0 ], 'name' ],
      width: 220
    },
    {
      key: 'album',
      title: '专辑',
      dataIndex: [ 'album', 'name' ],
      width: 400
    },
    {
      title: '操作',
      key: 'action',
      render: ( _, record ) => (
        <Space size="large">
          <a onClick={ () => {
            setCurId( record.id )
            setCurArtist( record.artists[ 0 ].name )
            setCurTitle( record.name )
            setCurAlbumID( record.album.id )
            // console.log( record )
          } }>
            <FontAwesomeIcon icon={ faPlay } />
          </a>
        </Space>
      ),
    }
  ]

  return (
    <div className="search">
      {/* <Player
        id={ curId }
        artist={ curArtist }
        title={ curTitle }
        albumID={ curAlbumID }
      ></Player> */}
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
          size="small"
          rowKey='id'
          columns={ columns }
          dataSource={ songsList }
          // pagination={
          //   {
          //     pageSize: params.per_page,
          //     total: articleData.count,
          //     onChange: pageChange,
          //     current: params.page
          //   }
          // }
          bordered
        />
      </Card>
    </div>
  )
}
export default SearchRes 
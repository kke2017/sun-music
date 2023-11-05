import { Card, Table, Input, Space, message } from "antd"
import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay } from "@fortawesome/free-solid-svg-icons"
import { observer } from "mobx-react"
import { useNavigate } from "react-router-dom"
import './queue.scss'

function Queue ( props ) {
  const { setIsPlaying,
    setCurId,
    setCurArtist,
    setCurTitle,
    setCurAlbumID,
  } = props
  const delayPlay = async function () {
    // 注意这里必须强制变一次isPlaying状态，否则触发不了useEffect
    setIsPlaying( false )
    let play = await new Promise( () => setTimeout( () => setIsPlaying( true ), 2500 ) )
    // 播放了就把定时器清除掉
    return clearTimeout( play )
  }
  // 无输入的全局提示
  const [ messageApi, contextHolder ] = message.useMessage()
  const info = () => {
    messageApi.info( '请输入想找的音乐' )
  }
  //拿到输入值
  const [ searchInput, setSearchInput ] = useState( '' )
  const handleChange = e => {
    setSearchInput( e.target.value )
  }
  // 搜索页面跳转
  const navigate = useNavigate()
  const toSearch = () => {
    if ( searchInput ) navigate( `/search?input=${ searchInput }` )
    else info()
  }
  // 歌单队列
  const { list, setList } = props
  const columns = [
    {
      title: '标题',
      dataIndex: 'name',
      width: 260,
    },
    {
      title: '歌手',
      dataIndex: 'artists',
      width: 220
    },
    {
      title: '专辑',
      dataIndex: 'album',
      width: 400
    },
    {
      title: '操作',
      render: ( _, record ) => (
        <Space size="middle">
          <button className="handler"
            onClick={ () => {
              setCurId( record.id )
              setCurArtist( record.artists )
              setCurTitle( record.name )
              setCurAlbumID( record.albumID )
              delayPlay()
            } }>
            <FontAwesomeIcon icon={ faPlay } title='播放' />
          </button>
          <button className="heart"
            onClick={ () => {
              setList( list.filter( item => item.id !== record.id ) )
            } }
          ><i className="iconfont icon-shanchu" title="从歌单中删除" /></button>
        </Space>
      ),
    }
  ]
  const { Search } = Input
  return ( <div className="queue">
    { contextHolder }
    <Card className="searchCompo">
      <div className="searchBar">
        <Search
          placeholder="输入想找的音乐"
          allowClear
          enterButton="Search"
          size="large"
          type="text"
          value={ searchInput }
          onChange={ handleChange }
          onSearch={ () => toSearch() }
        />
      </div>
      <Table
        className="table"
        size="middle"
        rowKey='id'
        columns={ columns }
        dataSource={ list }
        pagination={
          {
            pageSize: 10,
            total: list.length,
            position: [ "none", "bottomCenter" ]
          }
        }
        bordered
      />
    </Card>
  </div> )

}
export default observer( Queue )
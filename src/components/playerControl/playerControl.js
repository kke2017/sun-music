import React, { useEffect, useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faForward, faBackward, } from "@fortawesome/free-solid-svg-icons"
import { message } from "antd"
import { Link } from "react-router-dom"
import './playerControl.scss'
function PlayerControl ( props ) {
  // 这里没用useState，因为setState异步加载，会加载上一个的值
  const offset = useRef( 0 )
  // 歌单为空时的全局提示
  const [ messageApi, contextHolder ] = message.useMessage()
  const info = () => {
    messageApi.info( '歌单为空！' )
  }
  // 延迟播放函数
  const delayPlay = async function () {
    // 注意这里必须强制变一次isPlaying状态，否则触发不了useEffect
    setIsPlaying( false )
    let play = await new Promise( () => setTimeout( () => setIsPlaying( true ), 2500 ) )
    // 播放了就把定时器清除掉
    return clearTimeout( play )
  }
  // 拿到播放状态
  const { isPlaying, setIsPlaying,
    list,
    setCurId,
    setCurArtist,
    setCurTitle,
    setCurAlbumID,
    audioRef
  } = props
  const nextSong = function () {
    if ( list.length !== 0 ) {
      offset.current = ( ( offset.current + 1 ) % list.length )
      setCurId( list[ offset.current ].id )
      setCurArtist( list[ offset.current ].artists )
      setCurTitle( list[ offset.current ].name )
      setCurAlbumID( list[ offset.current ].albumID )
      delayPlay()
    } else {
      info()
    }
  }
  const lastSong = function () {
    if ( list.length !== 0 ) {
      if ( offset.current === 0 ) offset.current = ( ( offset.current + list.length - 1 ) % list.length )
      else offset.current = ( ( offset.current - 1 ) % list.length )
      setCurId( list[ offset.current ].id )
      setCurArtist( list[ offset.current ].artists )
      setCurTitle( list[ offset.current ].name )
      setCurAlbumID( list[ offset.current ].albumID )
      delayPlay()
    } else {
      info()
    }
  }
  // 监听audio
  useEffect( () => {
    audioRef.current.addEventListener( 'ended', () => autoPlayNextSong() )
    return audioRef.current.removeEventListener( 'ended', () => autoPlayNextSong() )
  } )
  // 歌曲结束后，自动播放下一首
  const autoPlayNextSong = function () {
    if ( !audioRef.current.loop ) {
      if ( list.length !== 0 ) {
        nextSong()
      } else {
        setIsPlaying( false )
      }
    }
  }
  const singleCycle = function () {
    const temp = audioRef.current.loop
    audioRef.current.loop = !temp
  }
  const randomPlay = function () {
    if ( list.length !== 0 ) {
      // 取消单曲循环
      audioRef.current.loop = false
      const num = ( 10 * Math.random() ) | 0
      offset.current = ( num % list.length )
      setCurId( list[ offset.current ].id )
      setCurArtist( list[ offset.current ].artists )
      setCurTitle( list[ offset.current ].name )
      setCurAlbumID( list[ offset.current ].albumID )
      delayPlay()
    } else {
      info()
    }
  }
  const listCycle = function () {
    if ( list.length !== 0 ) {
      // 取消单曲循环
      audioRef.current.loop = false
      offset.current = 0
      setCurId( list[ 0 ].id )
      setCurArtist( list[ 0 ].artists )
      setCurTitle( list[ 0 ].name )
      setCurAlbumID( list[ 0 ].albumID )
      delayPlay()
    } else {
      info()
    }
  }
  return (
    <>
      <div className="music-player--controls">
        { contextHolder }
        <button className="skip-btn" onClick={ () => lastSong() }>
          <FontAwesomeIcon icon={ faBackward } />
        </button>
        <button
          className="play-btn"
          onClick={ () => setIsPlaying( !isPlaying ) }>
          { isPlaying ? <FontAwesomeIcon icon={ faPause } key={ 'pause' } />
            : <FontAwesomeIcon icon={ faPlay } key={ 'play' } /> }
          {/* 注意这里必须要带key，不带key无法进行识别两个组件，就算改变了isplay，也不会重新渲染 */ }
        </button>
        <button className="skip-btn" onClick={ () => nextSong() }>
          <FontAwesomeIcon icon={ faForward } />
        </button>

      </div>
      <div className="player__footer">
        { contextHolder }
        <button className="link" onClick={ () => singleCycle() }>
          <i className="iconfont icon-24gl-repeatOnce" title="单曲循环" ></i>
        </button>
        <button className="link" onClick={ () => randomPlay() }>
          <i className="iconfont icon-24gl-shuffle" title="随机播放"></i>
        </button>
        <button className="link" onClick={ () => listCycle() }>
          <i className="iconfont icon-xunhuan1" title="列表循环"></i>
        </button>
        <Link to="/queue" className="link" style={ { textDecoration: 'none' } }>
          <i className="iconfont icon-liebiao1" title="歌单"></i>
        </Link>
      </div>
    </>
  )
}

export default PlayerControl

import React, { useRef, useEffect, useState } from "react"
import PlayerInfo from "../playerInfo/playerInfo"
import PlayerControl from "../playerControl/playerControl"
import './player.scss'
import { Outlet } from "react-router-dom"
import { http } from "@/util/http"

function Player ( props ) {
  const { id, setCurId,
    artist, setCurArtist,
    title, setCurTitle,
    albumID, setCurAlbumID,
    isPlaying, setIsPlaying,
    list, setList } = props
  // 使用这个外链歌多一些,但是没法处理无版权无法播放的问题
  // const audioUrl = `https://music.163.com/song/media/outer/url?id=${ id }.mp3`
  const [ audioUrl, setAudioUrl ] = useState( 'https://music.163.com/song/media/outer/url?id=1454573250.mp3' )
  // 发送请求拿到audioUrl,不为null就更新url
  useEffect( () => {
    const getAudioUrl = async ( curId ) => {
      let res = await http.get( '/song/url',
        {
          params: {
            id: curId,
            realIP: '116.25.146.177'
          }
        } )
      let data = res.data.data[ 0 ].url
      if ( data ) setAudioUrl( data )
    }
    getAudioUrl( id )
  }, [ id ] )
  // 拿到audio dom，控制播放
  const audioRef = useRef( '' )
  useEffect( () => {
    if ( isPlaying ) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [ isPlaying ] )

  return (
    <div className="combine">
      <div className="player">
        <PlayerInfo
          artist={ artist }
          title={ title }
          albumID={ albumID }
        ></PlayerInfo>
        <audio
          src={ audioUrl }
          ref={ audioRef }
        ></audio>
        <PlayerControl
          isPlaying={ isPlaying }
          setIsPlaying={ setIsPlaying }
          list={ list }
          setList={ setList }
          id={ id }
          setCurId={ setCurId }
          artist={ artist }
          setCurArtist={ setCurArtist }
          title={ title }
          setCurTitle={ setCurTitle }
          albumID={ albumID }
          setCurAlbumID={ setCurAlbumID }
          audioRef={ audioRef }
        ></PlayerControl>
      </div >
      <Outlet></Outlet>
    </div>
  )
}
export default Player 
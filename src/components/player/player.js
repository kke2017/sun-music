import React, { useRef, useEffect, useState } from "react"
import PlayerInfo from "../playerInfo/playerInfo"
import PlayerControl from "../playerControl/playerControl"
import './player.scss'
import { Outlet } from "react-router-dom"

function Player ( props ) {
  let { id, artist, title, albumID } = props
  const audioUrl = `https://music.163.com/song/media/outer/url?id=${ id }.mp3`
  // 拿到audio dom，控制播放
  const audioRef = useRef( '' )
  const [ isPlaying, setIsPlaying ] = useState( false )

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
        ></PlayerControl>
      </div >
      <Outlet></Outlet>
    </div>
  )
}
export default Player
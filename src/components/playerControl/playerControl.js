import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlay, faPause, faForward, faBackward, } from "@fortawesome/free-solid-svg-icons"
import './playerControl.scss'
function PlayerControl ( props ) {
  // 拿到播放状态
  const { isPlaying, setIsPlaying } = props
  return (
    <div className="music-player--controls">
      <button className="skip-btn" onClick={ 1 }>
        <FontAwesomeIcon icon={ faBackward } />
      </button>
      <button
        className="play-btn"
        onClick={ () => setIsPlaying( !isPlaying ) }
      >
        { isPlaying ? <FontAwesomeIcon icon={ faPause } /> : <FontAwesomeIcon icon={ faPlay } /> }
      </button>
      <button className="skip-btn" onClick={ 1 }>
        <FontAwesomeIcon icon={ faForward } />
      </button>
    </div>
  )
}

export default PlayerControl

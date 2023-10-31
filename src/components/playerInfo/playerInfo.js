import React, { useState, useEffect } from "react"
import './playerInfo.scss'
import imgUrl from '@/asset/sun.svg'
import { http } from "@/util/http"

function PlayerInfo ( props ) {
  const { artist, title, albumID } = props
  const [ curImgUrl, setCurImgUrl ] = useState( '' )
  // 发送请求拿到专辑封面链接
  useEffect( () => {
    const getImgUrl = async ( albumID ) => {
      const res = await http.get( '/album',
        {
          params: {
            id: albumID,
          }
        } )
      setCurImgUrl( res.data.album.picUrl )
    }
    getImgUrl( albumID )
  }, [ albumID ] )

  return (
    <div className="music-player-info">
      <div className="details-img">
        <img
          className="details-img--image"
          src={ curImgUrl }
          alt={ "封面" }
        />
      </div>
      <div class="range"></div>
      <div className="artist-info">
        <h3 className="details-title">{ title }</h3>
        <h4 className="details-artist">{ artist }</h4>
        <div class="line"></div>
      </div>
    </div>
  )
}

export default PlayerInfo

import React, { useState, useEffect } from "react"
import './playerInfo.scss'
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
            realIP: '116.25.146.177'
          }
        } )
      setCurImgUrl( res.data.album.picUrl )
    }
    getImgUrl( albumID )
  }, [ albumID ] )

  return (
    <div className="playerInfo">
      <div className="details-img">
        <img
          className="details-img--image"
          src={ curImgUrl }
          alt={ "封面" }
        />
      </div>
      <div className="artist-info">
        <h3 className="details-title">{ title }</h3>
        <h4 className="details-artist">{ artist }</h4>
      </div>
    </div>
  )
}

export default PlayerInfo

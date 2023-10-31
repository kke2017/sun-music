import './App.scss'
import Layout from '@/page/layout/layout'
import Search from './page/search/search'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Queue from './page/queue/queue'
import Player from './components/player/player'
import React, { useState } from 'react'
function App () {
  //实现播放歌曲功能,修改id
  const [ curId, setCurId ] = useState( '1454573250' )
  //歌曲的基本信息显示：封面，作者，标题
  const [ curArtist, setCurArtist ] = useState( "乃木坂46" )
  const [ curTitle, setCurTitle ] = useState( "帰り道は遠回りしたくなる" )
  const [ curAlbumID, setCurAlbumID ] = useState( '90692083' )

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Player
              id={ curId }
              artist={ curArtist }
              title={ curTitle }
              albumID={ curAlbumID }
            ></Player> }>
            <Route index element={ <Layout></Layout> }></Route>
            <Route path='search' element={
              <Search
                curId={ curId }
                setCurId={ setCurId }
                curArtist={ curArtist }
                setCurArtist={ setCurArtist }
                curTitle={ curTitle }
                setCurTitle={ setCurTitle }
                curAlbumID={ curAlbumID }
                setCurAlbumID={ setCurAlbumID }
              ></Search> }></Route>
            <Route path='queue' element={ <Queue></Queue> }></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

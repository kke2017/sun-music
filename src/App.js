import './App.scss'
import Layout from '@/page/layout/layout'
import Search from './page/search/search'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Queue from './page/queue/queue'
import Player from './components/player/player'
import React, { useState } from 'react'
function App () {
  //实现播放歌曲功能,修改歌曲id
  const [ curId, setCurId ] = useState( '1454573250' )
  //歌曲的基本信息显示：封面，作者，标题,是否有版权，是否正在播放
  const [ curArtist, setCurArtist ] = useState( "乃木坂46" )
  const [ curTitle, setCurTitle ] = useState( "帰り道は遠回りしたくなる" )
  const [ curAlbumID, setCurAlbumID ] = useState( '90692083' )
  const [ isValid, setIsValid ] = useState( true )
  const [ isPlaying, setIsPlaying ] = useState( false )
  //歌单队列
  const [ list, setList ] = useState( [] )
  const [ listSongsId, setListSongsId ] = useState( '' )
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Player
              id={ curId }
              setCurId={ setCurId }
              artist={ curArtist }
              setCurArtist={ setCurArtist }
              title={ curTitle }
              setCurTitle={ setCurTitle }
              albumID={ curAlbumID }
              setCurAlbumID={ setCurAlbumID }
              isPlaying={ isPlaying }
              setIsPlaying={ setIsPlaying }
              list={ list }
              setList={ setList }
            ></Player> }>
            <Route index element={ <Layout></Layout> }></Route>
            <Route path='search' element={
              <Search
                setCurId={ setCurId }
                setCurArtist={ setCurArtist }
                setCurTitle={ setCurTitle }
                setCurAlbumID={ setCurAlbumID }
                setIsPlaying={ setIsPlaying }
                setIsValid={ setIsValid }
                list={ list }
                setList={ setList }
                listSongsId={ listSongsId }
                setListSongsId={ setListSongsId }
              ></Search> }></Route>
            <Route path='queue' element={
              <Queue
                list={ list }
                setList={ setList }
                listSongsId={ listSongsId }
                setListSongsId={ setListSongsId }
                setCurArtist={ setCurArtist }
                setCurTitle={ setCurTitle }
                setCurAlbumID={ setCurAlbumID }
                setCurId={ setCurId }
                setIsPlaying={ setIsPlaying }
              ></Queue> }></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

import React, { useRef } from "react"
import './layout.scss'
import searchImg from '@/asset/search.svg'
import { Input } from "antd"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { observer } from 'mobx-react-lite'
import { message } from "antd"

function Layout () {
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
  // 页面跳转
  const navigate = useNavigate()
  const toSearch = () => {
    if ( searchInput ) navigate( `/search?input=${ searchInput }` )
    else info()
  }

  return (
    <>
      <div className="layout">
        { contextHolder }
        <Input
          className='layoutInput'
          size="large"
          placeholder="输入想找的音乐"
          type='text'
          value={ searchInput }
          onChange={ handleChange }
          onPressEnter={ () => toSearch() }
        ></Input>
        {/* es6不支持在<img />标签内直接写图片的路径，如<img src="../images/photo.png"/> 会引入不了 */ }
        <button className="search"
          onClick={ () => toSearch() } >
          <img className="searchImg" src={ searchImg }  ></img>
        </button>
      </div>
    </>
  )
}
export default observer( Layout )
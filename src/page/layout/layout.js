import React, { useRef } from "react"
import './layout.scss'
import searchImg from '@/asset/search.svg'
import { Input } from "antd"
import { useState } from "react"
import { Link } from "react-router-dom"

function Layout () {
  //拿到输入值
  const [ searchInput, setSearchInput ] = useState( '' )
  const handleChange = e => {
    setSearchInput( e.target.value )
  }

  const getSearchRes = function () {
    console.log( searchInput )
    // console.log( props )
  }
  return (
    <>
      <div className="layout">
        <Input
          className='layoutInput'
          size="large"
          placeholder="输入想找的音乐"
          type='text'
          value={ searchInput }
          onChange={ handleChange }
        ></Input>

        {/* es6不支持在<img />标签内直接写图片的路径，如<img src="../images/photo.png"/> 会引入不了 */ }
        <Link to={ `/search?input=${ searchInput }` } >
          <img className="searchImg"
            src={ searchImg }
            onClick={ getSearchRes }></img>
        </Link>
      </div>
    </>
  )
}
export default Layout 
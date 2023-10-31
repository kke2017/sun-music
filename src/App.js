import './App.scss'
import Layout from '@/page/layout/layout'
import Search from './page/search/search'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
function App () {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Layout></Layout> }></Route>
          <Route path='/search' element={ <Search></Search> }></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

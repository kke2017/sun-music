import axios from "axios"
const http = axios.create( {
  baseURL: 'http://sunshine-music.vercel.app',
  timeout: 8000
} )
export { http }
import axios from "axios"
const http = axios.create( {
  baseURL: 'https://sunshine-music.vercel.app',
  timeout: 5000
} )
export { http }
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import user_router from "./src/routes/user_route.js"
import movie_router from "./src/routes/movie_route.js"
import show_route from './src/routes/shows_route.js'
import booking_route from './src/routes/booking_route.js'

const app = express()
app.use(cors())
app.use(cookieParser())
app.use('/api/show', show_route)
app.use('/api/show', booking_route)
app.use('/api/user' , user_router)
app.use('/api/movie', movie_router)

export default app
 

import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import auth_router from "./src/routes/auth.router.js"
import movie_router from "./src/routes/movie.router.js"
import show_route from './src/routes/shows.router.js'
import booking_route from './src/routes/booking.router.js'
import errorMiddleware from "./src/middlewares/error.middleware.js"

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use('/api/show', show_route)
app.use('/api/show', booking_route)
app.use('/api/auth' , auth_router)
app.use('/api/movie', movie_router)
app.use(errorMiddleware);
export default app
 

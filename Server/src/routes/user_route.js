import express from "express"
import {register,login} from '../controller/user_controller.js'

const router = express.Router();
// routes
router.post('/register', register)
router.get('/login', login)

export default router
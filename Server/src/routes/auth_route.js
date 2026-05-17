import express from "express"
import {register,login, refreshAscessToken} from '../controller/auth_controller.js'

const router = express.Router();
// routes
router.post('/register', register)
router.post('/login', login)
router.post('/refresh-token', refreshAscessToken)


export default router
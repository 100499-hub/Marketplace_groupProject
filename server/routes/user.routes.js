import { Router } from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getUserProfile, getUsers, loginUser, logOutUser, registerUser } from "../controllers/user.controller.js"

const router = Router()

router.route('/')
    .get( protect, getUsers )
    .post( registerUser )
// .post( middleware )

router.route('/profile')
    .get( protect, getUserProfile )
// .get( middleware, middleware)
// The middleware functions are ran in order.
// If the protect middleware returns then we never run the getUserProfile middleware
// The protect middleware must run next() for the getUserProfile to run

router.route('/login')
    .post( loginUser )

router.route('/logout')
    .post( logOutUser )

export default router
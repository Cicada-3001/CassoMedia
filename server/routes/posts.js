import express from "express" 
import { getFeedPosts, getUserPosts, likePost } from  "../controllers/posts.js" 
import { verifyToken } from "../middleware/auth.js"


const router = express.Router()


router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts)
router.patch("/:id/like", verifyToken,likePost)



export default router 

/* 
we are getting posts for a particular user
we are getting posts generally and
the getUser post will be resused to get  the posts of friend users 
the like post get the id of the post increments its like count 
we need to have a model of type post which ought to be linked to  the user 
a user could have a numbner of post just like friends and this would mean that the  value be stored as an arragy 
the patch look at whether it was liked or not if it was  we need to link the like to the user 

*/
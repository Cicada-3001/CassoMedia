import Post from  "../models/Post.js"
import User from  "../models/User.js"


export const createPost = async (req, res) =>{
    try{
        const {userId, description, picturePath} = req.body 
        const user = await User.findById(userId)
        const newPost = new Post({ 
            userId, 
            firstName: user.firstName, 
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath, 
            likes: [], 
            comments: []
        })
        await newPost.save()
        const post = await Post.find()
        res.status(201).json(post)
    }catch(err){
        res.status(409).json({ message: err.message })
    }
}


/* read */ 
export const getFeedPosts = async (req, res)=>{
    try{
        const post = await Post.find();
        res.status(200).json(post);
    }catch (err){
        res.status(404).json({ message: err.message})
    }
}



export const getUserPosts = async (req, res)=>{
    try{
        const { userId } = req. param
        const  post = await Post.find({ userId }) 
        res.status(200).json(post)
    }catch (err){
        res.status(404).json({ message: err.message})
    }
}

/* update */
export const likePost = async (req, res) =>{ 
    try{
        const { id }  = req.params
        const { userId } = req.body 
        const post = await Post.findById(id)
        const isLiked = post.likes.get(userId)

        if(isLiked){
            post.likes.delete(userId)
        }else{
            post.likes.set(userId, true)
        }
        const updatedPost = await Post.findByIdAndUpdate(
            id, 
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost)
    }catch (err){

    }
}












/* we need to fetch things from the request create an object with those values and save the  object 

we just need to await and save
remember that all the controller methods start we the word async this is because it is a potentail
the architure, we have the model which is an object  a mongoose schema that is created and attributes passed to it in 
form of an object 

mongoose.Schema()  method creates the schema, it is then   to the mongoose.model() method which takes in two arguments 
first is the name of the model and the second is the schema we created 

the controller references the schema in creating the  model but what happens is that 
the model that was created is referenced and values passed to it
this  are values from the frontend which can be accessed by .. the object 
after correctly inserting the post, we check to see if the post was inserted we therefore fetch a record 
from the database using the  find method,  whatever is returned is returned as a responsed to be accessed by the frontend 

there are those attributes that are fetched as parameters from the request and others that are fetched as the body 

the  routers files are the ones that directly link to the controller 

there are routers file those with file uplod that have been dec */
import User from  "../models/User.js"
/* update */
export const getUser = async (req, res) => {
    try{
        const { id } = req.params 
        const user = await  User.findById(id)
        res.status(200).json(user)
    } catch(err){
        res.status(404).json({ message: err.message })
    }
}


export const getUserFriends = async (req, res) => {
    try{  
    const { id } = req.params 
    const  user = await User.findById(id)
    const  friends = await Promise.all(
        user.friends.map((id)=> User.findById(id))
    )
    const formattedFriends = friends.map(
        ({ _id, firstName, lastName, occupation, location, picturePath })=>{
            return { _id, firstName, lastName, occupation, location, picturePath }
        }
    )
    res.status(200).json(formattedFriends)
    } catch(err){
        res.status(404).json({ message: err.message })
    }
} 


/* update */

export const addRemoveFriend = async (req, res)=> {
    try{
        const {id, friendId } = req.params
        const user = await User.findById(id)
        const friend = await User.findById(friendId)
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=> id !== friendId)
            friend.friends = friend.friends.filter((id)=> id !== friendId)
        }else{
            user.friends.push(friendId);
            friend.friends.push(id)
        }
        await user.save()
        await friend.save()

        const  friends = await Promise.all(
            user.friends.map((id)=> User.findById(id))
        )
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath })=>{
                return { _id, firstName, lastName, occupation, location, picturePath }
            }
        )
        res.status(200).json(formattedFriends)
    }catch (err){
        res.status(404).json( {message: err.message })
    }

}



/*
we are passing the  the id from  the front end in the request, it could be a request 
parameter or body, once that is done
the request parameter thus contains two values that is the id of the user 
and  the id of the friend which we will get from friend list 
we need to add the friend so what will happen is that 

we will check if the user friends list includes the id if it does 
we should remove it otherwise we should add it 

the filter method construct a new array with elements that passed theb tes 

after we have  changed the user and friend we need to update the two and that would mean 
saving them 


*/



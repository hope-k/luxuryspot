import { getSession } from "next-auth/react";
import { ErrorHandler } from "../utils/errorHandler";
//before we can get our user from our database we need to get the session and assign it to req.user so we can query for the user in our database using findOne(req.user._id)
//protecting api routes for authenticated users
const isAuthenticatedUser = async (req, res, next) => {
    try{
        const session = await getSession({ req });
        if(!session){
            throw new Error('Please Login to access this resource')
        }
        req.user = session.user
        next(); //call next to move to next middleware 
    }catch(err){
        res.json({
            error: err.message
        })
    }
}

//Middleware for handling user roles => User or Admin roles
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        //check to see if the role is not admin 
        if(!roles.includes(req.user.role)){ 
            return next(new ErrorHandler(`Role (${req.user.role}) cannot access this resource`, 403) )
        }
        next()
    } 
}


export {
    isAuthenticatedUser,
    authorizeRoles
}

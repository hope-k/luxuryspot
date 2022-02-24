import User from '../models/user';
import asyncErrorHandler from '../middlewares/asyncErrorHandler';
const cloudinary = require('cloudinary').v2
import absoluteUrl from 'next-absolute-url'
import sendEmail from '../utils/sendEmail';
import { ErrorHandler } from '../utils/errorHandler'
import crypto from 'crypto'

//setting up cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET

});


//Register user  => /api/auth/register
const registerUser = asyncErrorHandler(async (req, res) => {
    try {
        const avatar = {};
        if (req.body.avatar) {
            const result = await cloudinary.uploader.upload(req.body.avatar, {
                console.log('=====================', req.body.email)
                folder: `bookit/avatars`,
                width: '150',
                crop: 'scale'

            })
            avatar.public_id = result.public_id
            avatar.url = result.secure_url

        }
        const { name, email, password } = req.body
        //always await async await events
        const getUser = await User.findOne({ email: email })
        if (getUser) {
            throw new Error('Email already exists')
        }
        await User.create({

            name: name,
            email: email,
            password: password,
            avatar: avatar

        })

        res.status(200).json({
            success: true,
            message: 'Account Registered Successfully'
        })

    } catch (err) {
        res.json({
            error: err.message
        })
    }
});
//Current user profile /api/me
const currentUserProfile = asyncErrorHandler(async (req, res) => {
    //always await async await events
    const user = await User.findById(req.user._id)
    res.status(200).json({
        success: true,
        user: user
    });


});
//update user profile /api/me/update
const updateUserProfile = asyncErrorHandler(async (req, res) => {
    //always await async await events
    const user = await User.findById(req.user._id)
    if (user) {
        user.name = req.body.name
        user.email = req.body.email;
        if (req.body.password) {
            user.password = req.body.password
        }
    }
    if (req.body.avatar !== '') {
        const public_id = user.avatar.public_id
        //delete user previous image
        await cloudinary.uploader.destroy(public_id);
        const result = await cloudinary.uploader.upload(req.body.avatar, {
            folder: 'bookit/avatars',
            width: '150',
            crop: 'scale',

        });
        user.avatar = {
            public_id: result.public_id,
            url: result.secure_url
        }


    }
    await user.save();

    res.status(200).json({
        success: true,
        message: 'Profile Successfully Updated'
    })


});


//Forgot password /api/password/forgot
const forgotPassword = asyncErrorHandler(async (req, res) => {
    //always await async await events
    try{
        const user = await User.findOne({ email: req.body.email })
    
        if (!user) {
            throw new Error('User not found with this email')
        }
    
    
    
        //get resetToken
        const resetToken = await user.createResetPasswordToken();
        await user.save({ validateBeforeSave: false })
        //get domain
        const { origin } = absoluteUrl(req)
    
        //create password reset url
        const resetUrl = `${origin}/password/reset/${resetToken}`
        const message = `Your password reset url is: \n\n ${resetUrl} \n This url will expire in 30 minutes \n\n Ignore if you did not request for a reset - Hope K`
        try {
            await sendEmail({
                email: user.email,
                subject: 'Luxuryspot password recovery',
                message: message
            })
    
            res.status(200).json({
                success: true,
                message: `Email successfully sent to ${user.email}`
            })
        } catch (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler(err.message, 404))
    
    
        }

    }catch(err){
        res.json({
            error: err.message
        })
    }






});
//reset password /api/password/reset/:token
const resetPassword = asyncErrorHandler(async (req, res) => {
    try {
        //we hash the token from the query and find the equivalent hashed token in the db
        const resetPasswordToken = crypto.createHash('sha256').update(req.query.token).digest('hex')
        //always await async await events
        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })
        if (!user) {
            throw new Error('Password reset token is invalid or expired')
        }
        if (req.body.password !== req.body.confirmPassword) {
            throw new Error('Passwords do not match')
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save()
        res.status(200).json({
            message: 'Password Reset Successful'
        })



    } catch (err) {
        res.json({
            error: err.message
        })
    }

});


//All users - ADMIN - /api/admin/users
const allAdminUsers = asyncErrorHandler(async (req, res) => {
    //always await async await events
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            users: users
        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }


});
//Get user details - ADMIN - /api/admin/users/:id
const getUserDetails = asyncErrorHandler(async (req, res) => {
    //always await async await events
    try {
        const user = await User.findById(req.query.id);
        if (!user) {
            throw new Error('User not found with this id')
        }
        res.status(200).json({
            success: true,
            user: user
        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }


});
//Update user details - ADMIN - /api/admin/users/:id
const updateUserDetails = asyncErrorHandler(async (req, res) => {

    //always await async await events
    try {

        const user = await User.findById(req.query.id);
        if (!user) {
            throw new Error('User not found with this id')
        }
        user.role = req.body.role;
        await user.save();
        res.status(200).json({
            success: true,
        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }


});

//delete user details - ADMIN - /api/admin/users/:id
const deleteUser = asyncErrorHandler(async (req, res) => {
    //always await async await events
    try {
        const user = await User.findById(req.query.id);
        if (!user) {
            throw new Error('User not found with this id')
        }
        //remove user avatar
        if (user?.avatar?.public_id) {
            await cloudinary.uploader.destroy(user.avatar.public_id)

        }
        await user.remove();


        res.status(200).json({
            success: true,
            user: user
        });

    } catch (err) {
        res.json({
            error: err.message
        })
    }


});


export {
    registerUser,
    currentUserProfile,
    forgotPassword,
    updateUserProfile,
    resetPassword,
    allAdminUsers,
    getUserDetails,
    updateUserDetails,
    deleteUser
}
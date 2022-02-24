import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

const userSchema  = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [50, 'Your name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail(), 'Please enter a valid email'],
        trim: true,
        lowercase: true

    },
    password: {
        type: String,
        required: [true, 'Please enter your name'],
        minLength: [6, 'Your password must be more than 6 characters'],
        select: false,


    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    role: {
        type: String,
        default: 'user'  
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: {
        type: Date
    }


}, 
{
    timestamps: true
}
);


//Encrypt password before saving user 
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next() //its like a middleware so we have to call next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//Compare user passwords
userSchema.methods.comparePassword = async function (enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)

}
userSchema.methods.createResetPasswordToken = function(){
    //generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    //hash and set to resetPasswordToken field
    this.resetPasswordToken = crypto.createH('sha256').update(resetToken).digest('hex');
    //set password token expire 
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000
    //return the unhashed token and save the hashed one to the db
    return resetToken

}

export default mongoose.models.User || mongoose.model('User', userSchema)
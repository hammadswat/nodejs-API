import mongoose from "mongoose";
import bcrypt  from "bcrypt"
import jwt  from "jsonwebtoken";
import jwtSecret from "../config/jwt.mjs";

const {Schema} =  mongoose

 const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },

    tokens: {
        default: [],
        type: []
    }
    
 })

 userSchema.pre("save", function (next) {

    const user = this
    //encryption
    if(user.isModified('password')){
        
    
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);

    user.password = hash
    }
    next()
})

userSchema.methods.comparePassword = function (password) {
    const user = this;
    try {
        return bcrypt.compareSync(password, user.password);
    } catch (error) {
        console.error("Error comparing passwords:", error);
        return false; 
    }
};



userSchema.methods.generateToken = function(){
    const {_id} = this;
    try {
        const token = jwt.sign({_id}, jwtSecret);
        return token;

    } catch (error) {
        console.error("Error generating token:", error);
        return null; 
    }
}




 const Users = mongoose.model("users", userSchema)

export default Users


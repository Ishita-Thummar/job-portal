import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";




const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide your name!"],
        minLength:[3,"Name must contain atleast 3 characters!"],
        maxLength:[20,"Name can not exceed 20 characters!"],
    },
    email:{
        type:String,
        required:[true,"Please provide your email!"],
        validate:[validator.isEmail,"Please provide a valid email!"],
    },
    phone:{
        type:String,
        required:[true,"Please provide your phone number!"],
    },
    password:{
        type:String,
        required:[true,"Please provide your password!"],
        minLength:[8,"Password must contain atleast 8 characters!"],
        maxLength:[32,"Password can not exceed 32 characters!"],
        select:false,
    },
    role:{
        type:String,
        required:[true,"Please provide your role"],
        enum:["Worker","Employer"],
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

//hashing the password

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);

});

//comparing password

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
};

//generating a jwt token for authorization

userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRECT_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    });
};

export const User = mongoose.model("User",userSchema);
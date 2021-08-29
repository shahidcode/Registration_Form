const mongoose = require("mongoose");

// defining schema
const registerSchema = new mongoose.Schema({
    firstname : {               
        type:String
    },
    lastname : {
        type:String
    },
    email : {
        type:String,
        unique:true         
    },
    gender : {
        type:String
    },
    phonenumber : {
        type:Number,
        unique:true
    },
    age: {
        type:Number,
        required:true       
    },
    password : {
        type:String
    },
    confirmpassword : {
        type:String
    }
})

//creating collection
const registerCollection = new mongoose.model("Register",registerSchema)

//exporting module
module.exports = registerCollection;

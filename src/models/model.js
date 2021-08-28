const mongoose = require("mongoose");

// defining schema
const registerSchema = new mongoose.Schema({
    firstname : {               // you can write any variable name like first_name,FirSTName,etc
        type:String
    },
    lastname : {
        type:String
    },
    email : {
        type:String,
        unique:true         // email should be unique.If same email is already present in database,it will give an error.
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
        required:true       // you can do this part in html also
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

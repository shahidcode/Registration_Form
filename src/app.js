// registration form using node,express,mongoDB,HTML,CSS
// if the code is not executing,first go to backend directory by 'cd backend' and run it

const express = require('express');
const app = express();
const connect_path = require('./db/connect');     // acquiring mongoose connection from 'connect.js' into app.js
const path = require('path');
const hbs = require('hbs');
const port = process.env.PORT || 3000;
const register = require("./models/model");        // acquiring database schema and collection from 'model.js' into this file


const static_path = path.join(__dirname,"../public");
const partials_path = path.join(__dirname,"../partials");


app.use(express.static(static_path));    // built-in middleware to serve static files

app.set("view engine","hbs");
hbs.registerPartials(partials_path);

app.use(express.json());                            // this and below line are used to convert data recieved from body into json format.
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/login",(req,res)=>{
    res.render("login");
})

app.get("/register",(req,res)=>{
    res.render("register"); 
})

app.post("/register",async (req,res)=>{
    try{

        const pass = req.body.password;                 // We set name="password" in register.hbs for input type="password",this line gets value of it.
        const cpass = req.body.confirmpassword;         // We set name="confirmpassword" in register.hbs for input type="password",this line gets value of it.

        if(pass === cpass){
            
            const user_info = new register({
                firstname : req.body.firstname,             // firstname : is the same name taken from mongodb defined schema
                lastname : req.body.lastname,
                email : req.body.email,
                gender : req.body.gender,
                phonenumber : req.body.phonenumber,
                age : req.body.age,
                password : req.body.password,
                confirmpassword : req.body.confirmpassword
            });

            const saveInfo = await user_info.save();            // we used await because we are using async function
            res.status(200).render("home");
        } 
        else{
            res.send("Passwords are not matching");
        }
    }
    catch(error){
        res.status(404).send(error);
    }
})


app.post("/login",async (req,res)=>{
    const loginEmail = req.body.userEmail;
    const loginPass = req.body.passLogin;

    try{

        const findEmail = await register.findOne({email:loginEmail});           // 'findOne' returns the document if matched with provided query
        if(findEmail.password === loginPass){
            res.send("Login successful");
        }
        else{
            res.send("Invalid Email or Password");
        }
    }
    catch(err){
        res.status(400).send("Error");
    }
})


app.listen(port,()=>{
    console.log(`listening to port ${port}`);
})
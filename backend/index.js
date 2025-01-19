const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

const RegisterModel = require('./models/Register');


mongoose.connect("mongodb://127.0.0.1:27017/srujan");

app.post('/register',(req , res)=>{
    const {name , mail , password } = req.body;
    if(mail){
        RegisterModel.findOne({mail})
        .then(result=>{
            if(result.mail == mail){
                res.json("user already exists");
            }else{
                RegisterModel.create({name , mail , password})
                .then(result =>{
                    console.log("user registered successfully:",result);
                    res.json(result);
                })
                .catch(err =>{
                    console.log("error",err);
                    res.json(err);
                });
            }
        })
    }
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
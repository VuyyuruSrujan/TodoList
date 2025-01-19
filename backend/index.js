const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
const nodemailer = require('nodemailer');

const RegisterModel = require('./models/Register');


mongoose.connect("mongodb://127.0.0.1:27017/srujan");

app.post('/register',(req , res)=>{
    const {name , mail , password } = req.body;
    if(mail){
        RegisterModel.findOne({mail})
        .then(result=>{
            if(result){
                if(result.mail == mail){
                    res.json("user already exists");
                }
            }else{
                RegisterModel.create({name , mail , password})
                .then(result =>{
                    console.log("user registered successfully:",result);
                    res.json("Registered successfully");
                })
                .catch(err =>{
                    console.log("error",err);
                    res.json(err);
                });
            }
        })
    }
});

app.post('/login' , (req, res)=>{
    const {mail , password} = req.body;
    RegisterModel.findOne({mail})
    .then(result =>{
        if(result){
            if(result.password == password){
                res.json({message:"logged in succeffully"});
            }else{
                res.json("incorrect password");
            }
        }else{
            res.json("you are not registered");
        };
    })
});

app.post('/check_mail',(req , res) =>{
    const {mail} = req.body;
    RegisterModel.findOne({mail})
    .then(result =>{
        if(result){
            res.json({message:"user exist"});
        }else{
            res.json("you are not registered");
        }
    })
})

const SECRET_KEY = "Vuyyu*@03";

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'srujan9063@gmail.com',
        pass: 'alun aako xknx mgnv'
    }
});

app.post('/sendOTP', (req, res) => {
    const { mail } = req.body;

    // Generate a 6-digit random OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(`Generated OTP: ${otp}`);

    // Send mail with OTP
    const mailOptions = {
        from: 'srujan.vuyyuru1@gmail.com',
        to: mail,
        subject: 'Reset Password Here',
        text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending OTP:', error);
            res.status(500).json({ message: 'Failed to send OTP', error });
        } else {
            console.log('OTP sent: ' + info.response);
            res.status(200).json({ message: 'OTP sent successfully', otp });
        }
    });
});

app.listen(5001, () => {
    console.log("Server is running on port 5001");
});
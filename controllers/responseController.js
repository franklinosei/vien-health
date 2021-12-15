require('dotenv').config();
require('../config/database').connect();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');




//function that handles the signup of a new user
async function register (req, res, next) {
    try{
        const {firstName, lastName, email, password } = req.body;

        //check if the user already exists
        const user = await User.findOne({ email });

        //if the user exists, return an error
        if(user) {
            return res.status(400).send('User already exists');
        }


            // Validate user input
        if (!(email && password && firstName && lastName)) {
           return res.status(409).send("All input is required");
         }

         // Hash password
        salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: hashedPassword
        });

        // generate token
        token = jwt.sign({ user_id: newUser._id, email }, process.env.TOKEN_KEY, {expiresIn: '2h'});

        newUser.token = token;

        // Save user to database
        const savedUser = await newUser.save();

        // Send response
       return res.status(201).json(savedUser);
    }
    catch(err){
        console.log(err);
      return res.status(400).send({error: err});
    }
}




//function that handles the login of a user
async function login(req, res, next) {
   try{
       const { email, password } = req.body;
        //check if the user exists
        const user = await User.findOne({ email });
        
        //if the user does not exist, return an error
        if(!user) {
            return res.status(400).send('User does not exist');
        }

        //check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);

        if(user && isMatch) {
            //generate token
            token = jwt.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, {expiresIn: '2h'});

            //update the user's token
            user.token = token;

            await user.save();

          

            //send response
           return res.status(200).json(user);
        }

        return res.status(400).send('Invalid credentials');
   }
   catch(err){
         console.log(err);
         res.status(400).send({error: err});
   }
}


//function that handles the logout of a user
function logout(req, res, next) {
    res.send('logout handler');
}




module.exports = {login, register, logout};
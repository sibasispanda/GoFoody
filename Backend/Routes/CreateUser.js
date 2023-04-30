const express = require('express');
const router = express.Router();
const User = require('../models/User')
const {body,validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWTSECRET = 'pandasibasis';

// For Sign Up -------------------------------------------------------------------------------------------

router.post('/createuser', 

body('email').isEmail(),
  // password must be at least 5 chars long
  body('password','Incorrect Password').isLength({ min: 5 }),
  body('name').isLength({ min: 5 })



  ,async (req,res)=>{

 // Finds the validation errors in this request and wraps them in an object with handy functions
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }

const salt = await bcrypt.genSalt(10);
let secpass = await bcrypt.hash(req.body.password,salt);

    try{
        await User.create({
            name:req.body.name,
            password:secpass,
            email:req.body.email,
            location:req.body.location
        }).then(res.json({success:true}))
    } catch(error) {
        console.log(error)
        res.json({success:false})
    }
})


//To find the name from database using email stored in local storage---------------------------------------

router.post('/userfind',async(req,res)=>{
    let email = req.body.email;
    try{
      let user = await User.findOne({email});
      if(!user)
      return res.send('Not available');


      res.json({name:user.name});
    }catch(error){
        res.send(error.message)
    }
})

// For Login-----------------------------------------------------------------------------------------------

router.post('/userlogin', 

body('email').isEmail(),
  // password must be at least 5 chars long
  body('password','Incorrect Password').isLength({ min: 5 })



  ,async (req,res)=>{

 // Finds the validation errors in this request and wraps them in an object with handy functions
 const errors = validationResult(req);
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }


let email = req.body.email;
    try{
        let userData = await User.findOne({email});

        if(!userData){
            return res.status(400).json({errors:"Incorrect Credentials"})
        }

        const pwdcompare = await bcrypt.compare(req.body.password,userData.password)
        if(!pwdcompare){
            return res.status(400).json({errors:"Incorrect password Credentials"})
        }

        const data = {
            user:{
                id:userData.id
            }
        }

    const authToken = jwt.sign(data,JWTSECRET);
    return res.json({success:true,authToken:authToken});
    } catch(error) {
        console.log(error)
        res.json({success:false})
    }
})








module.exports = router;
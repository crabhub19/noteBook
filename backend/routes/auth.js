
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Users = require('../models/Users');
const JWT_SECRET = "ben10";


//route1 : create user post:api/auth/create no login requred
router.post('/create',[
    //express validation
    body('name','your name charecter must be at least 3').isLength({ min: 3 }),
    body('password','password must be min 4 digit').isLength({ min: 4 }),
    body('email').isEmail()
],async(req,res)=>{
    let allRight = false;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({allRight, errors: errors.array()[0].msg });
    }
    //cheak email exist
    let user = await Users.findOne({email : req.body.email});
    if (user) {
      return res.status(400).json({allRight, errors: "email alredy exist" });
    }


    try {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password,salt);
      user = await Users.create({
        name: req.body.name,
        password: hashPassword,
        email: req.body.email,
    })
    const data = {
      user:{
        id:user.id
      }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    allRight=true;
    res.json({allRight,authToken,errors});
  } catch (error) {
      res.status(500).send(error.message);
  }
    
})





//route2: login user post:api/auth/login no login requred
router.post('/login',[
    //express validation
    body('password','password must be min 4 digit').isLength({ min: 4 }),
    body('email').isEmail()
],async(req,res)=>{
    let allRight = false;
    let {email,password} = req.body;
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({allRight, errors: errors.array()[0].msg });
    }
        //cheak email not exist
    try {
  
      let user = await Users.findOne({email : email});
      if (!user) {
        return res.status(400).json({allRight, email: "enter your correct email", });
      }
      const matchPassword = await bcrypt.compare(password,user.password);
      if (!matchPassword){
        return res.status(400).json({allRight, password: "enter your correct password" });
      }
      const data = {
      user:{
        id:user.id
       }
      }
    const authToken = jwt.sign(data,JWT_SECRET);
    allRight=true;
    res.json({allRight,authToken,errors});
    } catch (error) {
      res.status(500).send(error.message);
    }
  })



//route3: get user post:api/auth/getuser :login requred

  router.get('/getuser',fetchuser,async(req,res)=>{

    try {
      let userId = req.user.id;
      const user = await Users.find({});
      res.send(user);
    } catch (error) {
      res.status(401).send(error.message);
    }

})













module.exports = router;
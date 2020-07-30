const router = require('express').Router();
const User= require('../models/user');
const Sentry= require('@sentry/node');

router.post('/register', async (req,res)=>{

    const emailExist= await User.findOne({email : req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');
    const user= new User({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password
    });
    try{

        const savedUser= await user.save();
        res.send(savedUser);

    }
    catch(err)
    {
        Sentry.captureException(err);
        res.status(400).send(err);
    }
});



module.exports=router;
const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs')
const User=require('../modal/user');
const config=require('config')
const jwt=require('jsonwebtoken')
const auth=require("../middleware/auth")


router.post('/register',(req,res)=>{
    const {name,email,password,confirmpassword,number,state}=req.body;
     User.findOne({email}).then(user=>{
         if (user) return res.status(400).json("ERROR!!!!!!!!!!\nEMAIL ID ALREADY EXISTS")
 
         const newuser=new User({
             name,
             email,
             password,
             confirmpassword,
             number,
             state
         })
 
        bcrypt.genSalt(10, function(err1, salt) {
            bcrypt.hash(newuser.password, salt, function(err1, hash1) {
                if (err1) throw err1;
                newuser.password=hash1;
                
                bcrypt.genSalt(10, function(err2, salt) {
                    bcrypt.hash(newuser.confirmpassword, salt, function(err2, hash2) {
                        if (err2) throw err2;
                        newuser.confirmpassword=hash2;
                        newuser.save()
                                .then(user=>{
                                    res.json(user.id)
                                })
                    })
                })    
                   
            });
        });
 
     })
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body;
     User.findOne({email}).then(user=>{
         if (!user) return res.status(400).json("ERROR!!!!!!!!!!\nEMAIL ID DOES NOT EXIST")
 
         bcrypt.compare(password,user.password)
         .then(ismatch=>{
             if(!ismatch) return res.status(400).json("ERROR!!!!!!!!!!\nINVALID PASS")
             jwt.sign({id:user.id},config.get('jwtsecret'),{expiresIn:3600},
                 (err,token)=>{
                     if(err) throw err;
                     else
                     res.json(
                     {token,
                     id:user.id,name:user.name,email:user.email
                     })
                 }
             )
         })
     })
})
const validuser=(req,res,next)=>{
    var token=req.header('auth-token');
    req.token=token;
    next();

}

router.get('/getuser',auth,(req,res)=>{
    // jwt.verify(req.token,config.get('jwtsecret'),async(err,payload)=>{
    //     if(err)  
    //     {res.sendStatus(403)}
    //     else{
    //         const data=User.find();
    //         res.json(data)
    //     }
    // })
   
    User.findById(req.user.id)
        .select(['-password','-confirmpassword'])
        .then((user)=>{
            res.json(user)
        })

})

module.exports=router;
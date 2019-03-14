const express = require('express');
const router = express.Router();
const user = require('../db/model/user')
const utils = require('../util/util')
const jsonwetToken =require('../module/jwt')
const getemail = require('../module/mail')
//创建token
router.post('/login',(req,res)=>{
    let {name,password} = req.body;
    let token = jsonwetToken.creatToken({id:'普通会员'})
    // user.find
    utils.sendRes(res,0,'登录成功',{token})
})
router.post('/test',(req,res)=>{
    let token = jsonwetToken.creatToken({id:'haha'})
    utils.sendRes(res,0,'登录成功',{token})
})
let obj = {}
//获取验证码
router.post('/getCode',(req,res)=>{
    console.log(req.body)
    console.log(2121)
    let {email}=req.body;
    let time = new Date().getTime();
    let code = parseInt(Math.random()*1000000)
    obj[email] =code;
    obj[code] = time;
    
    getemail.send(email,code)
    
        utils.sendRes(res,0,'好',obj)
    
    // emain.send()
})

//注册
router.post('/reg',(req,res)=>{
    console.log(obj)
    let nowTime = new Date().getTime();
    let {code,email,adminName,password,sex,phone,power,desc} = req.body;
    console.log(power,code,obj[email])
    if(obj[email] == code && nowTime - obj[code]<300000){
        console.log(1)
        user.insertMany({email,adminName,password,sex,phone,power,desc})
        .then((data)=>{
            utils.sendRes(res,0,'注册成功',data)
        })
    }else if(obj[email] == code && nowTime - obj[code] > 300000){
        utils.sendRes(res,1,'验证码超时',null)
    }else{
        utils.sendRes(res,1,'注册错误',null)
    }
})
module.exports = router
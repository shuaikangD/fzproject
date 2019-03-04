const express = require('express');
const router = express.Router();
const utils = require('../util/util');
const adminModel = require('../db/model/adminModel');
const jwt = require('../module/jwt');
const mail = require('../module/mail');
let checks={} 
let datee = 0;
// const store = require('store');

router.post('/repeated',(req,res)=>{
    let {username} = req.body;
    adminModel.find({username:username})
    .then((data)=>{
        if(data.length===0){
            utils.sendRes(res,0,'ok',data)
        }else{
            utils.sendRes(res,-1,'用户名已存在',null);
        }
    })
})

//添加
router.post('/addAdmin',(req,res)=>{
    let {username,password,email,mobile,desc,isadmin,yzm} = req.body;
    let newdate = Date.now();
    let cha = newdate - datee;
    console.log(cha);
    if(cha>=300000){
        utils.sendRes(res,-3,'验证码已超时',null);
    }else{
        if(Number(yzm) === checks[email]){
            adminModel.find({username:username})
            .then((data)=>{
                console.log(data);
                if(data.length===0){
                    return adminModel.insertMany({username,password,email,mobile,desc,isadmin})
                }else{
                    utils.sendRes(res,-1,'用户名已存在',null);
                }
            })
            .then((data)=>{
                utils.log(data);
                if(data){
                    utils.sendRes(res,0,'注册成功',data);
                }
                
            })
            .catch((err)=>{
                utils.log(err);
                utils.sendRes(res,-1,'注册失败',null);
            })
        }else{
            utils.sendRes(res,-1,'验证码错误',null);
        }
        
    }
    
})
router.post('/getEmailCode',(req,res)=>{
    let {email}=req.body
    console.log(email);
    let code=parseInt(Math.random()*100000)
    datee = Date.now();
    checks[email]=code
    mail.send(email,code)
    .then(()=>{
        res.send({err:0,msg:'获取验证码ok'})
    })
    .catch(()=>{
        res.send({err:-1,msg:'获取验证码失败'})
    })
})

router.post('/delAdmin',(req,res)=>{
    let {_id} = req.body;
    adminModel.remove({_id:_id})
    .then((data)=>{
        utils.sendRes(res,0,'ok',data);
    })
    .catch((err)=>{
        utils.log(err)
        utils.sendRes(res,-1,'no',null);
    })
})
router.post('/login',(req,res)=>{
    let username = req.body.username;
    let password = req.body.password;
    let isadmin = req.body.isadmin;
    // console.log(isadmin);
    adminModel.find({username:username,password:password})
    .then((data)=>{
        // console.log(data)
        let jsonwt= jwt.creatToken(username);
        // console.log(jsonwt);
        // console.log(data[0].username,data[0].password);
        let dj = {
            data:data,
            tk:jsonwt
        }
        
        let _isadmin = isadmin === 'false'? false : true;
        // console.log(isadmin,data[0].isadmin)
        if(data.length>=1){
            // localStorage.setItem('haha',jsonwt);
            if(_isadmin===data[0].isadmin){
                utils.sendRes(res,0,'登录成功',dj);
            }else{
                utils.sendRes(res,-1,'请重新设置权限',null)
            }
        }else{
            utils.sendRes(res,-1,'用户名或密码错误',null);
        }
    })
    .catch((err)=>{
        utils.log(err);
        utils.sendRes(res,-1,'用户名或密码错误',null);
    })
})
module.exports=router;
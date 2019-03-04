const express = require('express');
const router = express.Router();
const utils = require('../util/util');
const userModel = require("../db/model/userModel");
//添加
router.post('/addmember',(req,res)=>{
    let {name,phone,email,dz,remarks} = req.body;
    userModel.insertMany({name,phone,email,dz,remarks})
    .then((data)=>{
        utils.log(data);
        utils.sendRes(res,0,'添加ok',data);
    })
    .catch((err)=>{
        utils.log(err);
        utils.sendRes(res,-1,'添加失败',null);
    })
})
//查询全部
router.post('/getMember',(req,res)=>{
    userModel.find()
    .then((data)=>{
        utils.sendRes(res,0,'get ok',data);
    })
    .catch((err)=>{
        utils.log(err);
        utils.sendRes(res,-1,'get out',null);
    })
})
//删除
router.post('/delMember',(req,res)=>{
    let _id = req.body._id;
    userModel.remove({_id:_id})
    .then((data)=>{
        utils.sendRes(res,0,"删除成功",data)
    })
    .catch((err)=>{
        utils.sendRes(res,-1,err,null);
    })
})
//通过id查询
router.post('/getMemberById',(req,res)=>{
    let {_id} = req.body;
    userModel.find({_id})
    .then((data)=>{
        utils.log(data);
        utils.sendRes(res,0,'get ok',data);
    })
    .catch((err)=>{
        utils.log(err);
        utils.sendRes(res,-1,'get not',null);
    })
})
//修改
router.post('/updataMemberById',(req,res)=>{
    let {name,phone,email,dz,remarks} = req.body;
    let _id = req.body._id;
    console.log(_id);
    userModel.updateOne({_id:_id},{name,phone,email,dz,remarks})
    .then((data)=>{
        utils.log(data);
        utils.sendRes(res,0,'updata ok',data);
    })
    .catch((err)=>{
        utils.log(err);
        utils.sendRes(res,-1,'updata not',null);
    })
})

//分页
router.post('/getMemberByPage',(req,res)=>{
    let page=req.body.page||1
    let pageSize=req.body.pageSize||2
    let result={count:0,lists:[]}
    userModel.find()
    .then((data)=>{
     result.count=data.length;// 获取总的数据条数
     let all = Math.ceil(result.count/pageSize);

    if(page < 1){
        console.log(1);
        // utils.sendRes(res,0,'输入有误',null);
    }else{
     return userModel.find().skip(Number((page-1)*pageSize)).limit(Number(pageSize))
    }
    })
    .then((data)=>{
        // console.log(data)
        result.lists=data       
        utils.sendRes(res,0,'get ok',result)
    })
    .catch((err)=>{
     utils.log(err)
     utils.sendRes(res,-1,err._message,null)})
 })
//模糊查询
 router.post('/getMemberMH',(req,res)=>{
    let key = req.body.key;
    let reg = new RegExp(key);
    userModel.find({$or:[{name:{$regex:reg}},{remarks:{$regex:reg}}]})
    .then((data)=>{
        utils.log(data);
        utils.sendRes(res,0,'MHget ok',data);
    })
    .catch((err)=>{
        utils.log(err);
        utils.sendRes(res,-1,'MHget not',null);
    })
 })
 //批量删除
 router.post('/getMemberAll',(req,res)=>{
     let ids = req.body.ids;
    for(var i = 0;i<=ids.length;i++){
        userModel.remove({_id:ids[i]})
        .then((data)=>{
            utils.log(data);
        })
        .catch((err)=>{
            res.send('out')
        })
    }
 })
module.exports = router
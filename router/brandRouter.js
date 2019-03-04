const express = require('express')
const router = express.Router();

const brand = require('../db/model/brand')
const util = require('../util/util')
//查找品牌
router.post('/findbrand',(req,res)=>{
    brand.find()
    .then((data)=>{
        // console.log(data)
        util.sendRes(res,0,'查询成功',data)
        res.send({err:0,msg:'查询成功',data})
    })
})
//添加品牌
router.post('/addbrand',util.verify,(req,res)=>{
    // console.log(req.body)
    let {serial,name,type,desc,logo} = req.body
    brand.insertMany({serial:Number(serial),name,type,desc,logo})
    .then((data)=>{
        console.log(data)
        util.sendRes(res,0,'添加成功',data)
    })
})
//删除品牌////////////////////////////////////////////////
router.post('/updataById',util.verify,(req,res)=>{
    let {_id} = req.body;
    brand.deleteMany({_id})
    .then((data)=>{
        util.sendRes(res,0,'删除成功',data)
    })
    .catch((err)=>{
        util.sendRes(res,1,'删除失败',data)
    })
})
//根据ID查数据品牌
router.post('/getDataById',(req,res)=>{
    let {_id} = req.body
    brand.find({_id})
    .then((data)=>{
        console.log(data)
        util.sendRes(res,0,'查询成功',data)
    })
    
})
//修改品牌
router.post('/upbrand',(req,res)=>{
    let {serial,name,type,desc} = req.body;
    brand.updateOne({serial,name,type,desc})
    .then((data)=>{
        res.send({err:0,msg:'修改成功',data})
    })
})
//页码
router.post('/page',(req,res)=>{
    let {page,pageSize} = req.body;
    // let count = 0;
    let result = {count:0,lists:[]}
    brand.find()
    .then((data)=>{
        result.count = data.length;
        return  brand.find().skip(Number(page-1)*pageSize).limit(Number(pageSize))
    })
    .then((data)=>{
        //data只是两条数据
        result.lists =data;
        util.sendRes(res,0,'查询成功',result)
    })

})

//关键字检索
router.post('/search',(req,res)=>{
    let {word} = req.body;
    // brand.find({})
    // console.log(req.body)
    let reg = new RegExp(word)
    brand.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})
    .then((data=>{
        util.sendRes(res,0,'查询成功',data)
    }))

})

module.exports = router
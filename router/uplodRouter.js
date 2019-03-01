const express = require('express')
const router = express.Router();
const multer = require('multer')
const fs=require('fs')
const Path=require('path')
const upload = multer({dest:'uploads/'})//指定上传的缓存文件夹
router.post('/upimg',upload.single('hehe'),(req,res)=>{
    // console.log(req.file)//这是multer的key值,当引入upload.single()才有req.file
    //执行到这就已经缓存了

    let {path,mimetype} = req.file
    //  只允许图片上传
    let ext = mimetype.split('/')[1]
    if(['jpg','png','gif','jpeg'].indexOf(ext) == -1){
        return res.send({err:'非法格式'})
    }
    //对图片命名
    let name = (new Date()).getTime() 

    fs.readFile(path,(err,data)=>{
        if(err){return res.send({err:'失败'})}
        fs.writeFile(Path.join(__dirname,`../public/img/${name}.${ext}`),data,'binary',(err)=>{
            if(err){return res.send({err:'上传失败'})}
            let url = `/static/img/${name}.${ext}`
             res.send({err:0,msg:'上传成功',url})
            // return url;
        })
    })


})
// req.file
// { fieldname: 'hehe',
//       originalname: 'IMG_3872.JPG',
//       encoding: '7bit',
//       mimetype: 'image/jpeg',
//       destination: 'uploads/',
//       filename: '47fff50927d63bfef82f0642042558aa',
//       path: 'uploads/47fff50927d63bfef82f0642042558aa',
//       size: 88546 }

module.exports = router
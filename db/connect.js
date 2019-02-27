const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/user',{useNewUrlParser:true});
var db = mongoose.connection;
db.on('error',(err)=>{
    console.log("连接失败");
})
db.on("open",()=>{
    console.log('连接成功');
})
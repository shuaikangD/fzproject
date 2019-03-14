const mongoose = require('mongoose');
mongoose.connect('mongodb://10.9.62.175:27017/clothing',{useNewUrlParser:true});
var db = mongoose.connection;
db.on('error',(err)=>{
    console.log("连接失败");
})
db.on("open",()=>{
    console.log('连接成功');
})
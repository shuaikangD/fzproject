const mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true},
    dz:{type:String,required:true},
    remarks:{type:String,default:'说点什么...'},
    // pass:{type:String,required:}
})
let member = mongoose.model('member',userSchema);

module.exports = member;
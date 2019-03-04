const mongoose = require('mongoose');
let adminSchema = mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    mobile:{type:String,required:true},
    email:{type:String,required:true},
    type:{type:String,required:false},
    desc:{type:String,required:true},
    isadmin:{
        type:Boolean,
        default:false
    }
})

let admin = mongoose.model('admins',adminSchema);

module.exports = admin;
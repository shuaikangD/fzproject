const mongose = require('mongoose');
let userdb = new mongose.Schema({
    adminName:{type:String,require:true},
    password:{type:String,required:true},
    sex:{type:String,required:true},
    phone:{type:String,required:true},
    power:{type:String,required:true},
    desc:{type:String,required:true},
    email:{type:String,required:true}
})

let model = mongose.model('user',userdb);
module.exports = model
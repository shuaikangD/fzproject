const mongoose = require('mongoose')
let brandSchema = new mongoose.Schema({
    // serial:{type:Number,required:true},
    logo:{type:String,required:true},
    name:{type:String,required:true},
    type:{type:String,required:true},
    desc:{type:String,required:true}
})

let model = mongoose.model('brand',brandSchema)
module.exports = model
const express = require('express');
const app = express();
const path = require('path');
const con=require('./db/connect')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static',express.static(path.join(__dirname,"public")));


app.listen(3001,()=>{
    console.log('server start in port :'+3001)
})
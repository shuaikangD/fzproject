const express = require('express');
const app = express();
const path = require('path');
const con=require('./db/connect')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static',express.static(path.join(__dirname,"public")));
const util = require('./util/util')


const brand = require('./router/brandRouter')
const upimg = require('./router/uplodRouter')
const user = require('./router/userRouter')

app.use('/brand',brand)
app.use('/upload',upimg)
app.use('/use',user)


app.listen(3001,()=>{
    console.log('server start in port :'+3001)
})
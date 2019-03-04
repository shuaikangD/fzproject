const express = require('express');
const app = express();
const path = require('path');
const con=require('./db/connect')
const utils = require('./util/util')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static',express.static(path.join(__dirname,"public")));

const adminAdmin = require('./router/adminRouter');
const adminUser=require('./router/userRouter')
app.use('/admin/user/',utils.verify,adminUser);
app.use('/admin/admin/',adminAdmin);

app.listen(3001,()=>{
    console.log('server start in port :'+3001)
})
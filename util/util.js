const config=require('../config')
//项目的配置文件
let  utils={
    log:function(msg){
        if(!config.debug){return false}
        console.log(msg)
    },
    sendRes:function(res,err,msg,data){
        let obj={
            err:err,
            msg:msg,
            data:data||null
        }
        res.send(obj)
    }
}
module.exports=utils

const config=require('../config')
const jsonwebtoken =require('../module/jwt')
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
    },
    verify:function(req,res,next){

        // 验证token合法 以及token是否超过有效期
        let {token}=req.body
        console.log(token)
        if(!token){res.send({err:"-998",msg:'token 缺失'}) }
        jsonwebtoken.checkToken(token)
        .then((data)=>{
            // console.log(data)
            // console.log(data.id)
            // //时间的验证
            // console.log(Date.now())
            if(Date.now()-data.ctime>=config.loginTime){
                res.send({err:"-997",msg:'token 超时 请重新登录'})
            }else if(data.id = '普通会员'){
                // next()
                // console.log('你还没获得权限')
                // alert('你还没获得权限')
                res.send({err:"-997",msg:'token 你还没获得权限'})
                
               
            }else{
                res.send({err:1,msg:'token 成功继续执行'})
                console.log('token')
            }
            
      
        })
        .catch((err)=>{
            res.send({err:"-999",msg:'token 非法'})
    
        })

    }
}
module.exports=utils

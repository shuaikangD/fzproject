const jwt = require('jsonwebtoken')
const scrict = 'safasf'

function creatToken(playload){
    playload.ctime = Date.now();
    return jwt.sign(playload,scrict)
}
function checkToken(token){
    return new Promise((resovle,reject)=>{
        jwt.verify(token,scrict,(err,data)=>{
            if(err){ reject('token 验证失败')}
            resovle(data)
        })
    })

}
module.exports={
    creatToken,checkToken
}
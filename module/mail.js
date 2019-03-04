
const nodemailer = require("nodemailer");


let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 465,
    secure: true, //   qq需要改为ture
    auth: {
      user: '512892279@qq.com', // generated ethereal user
      pass: 'lsbmateagnlncajg' // 安全码
    }
  });



function send(tomail,msg){
    
      // setup email data with unicode symbols
      let mailOptions = {
        from: '"Fred Foo 👻" <512892279@qq.com>', // sender address
        to: tomail, // list of receivers
        subject: "Hello ✔", // Subject line
        text: `${msg}`, // plain text body
        // html: "<b>Hello world?</b>" // html body
      };
      
      // send mail with defined transport object
      transporter.sendMail(mailOptions,(err,info)=>{
              if(err){
                reject()
            }else{
                reslove()
            }
      })
}
  
// send()
module.exports={send}

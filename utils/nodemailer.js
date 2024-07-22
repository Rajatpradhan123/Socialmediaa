const nodemailer = require('nodemailer')

const sendmail =function(req,res){

    const transport =nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:"pradhanrajat1999@gmail.com",
            pass:"olzk zybo elpe njcy"
        }
    });

    const mailoption ={
        from:"pradhanrajat1999@gmail.com",
        to:req.body.email,
        subject:"only for test mail",
        text:'hello welcome from oue team',
        html:"<h1>your registration is suuccessfull</h1>"
    }

    transport.sendMail(mailoption,function(err,info){

        if(err){
            console.log(err)
           return res.send(err)
        }
        console.log(info)
        res.send("email sent to user")
    })


}

module.exports = sendmail
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
async function enviarCorreo(req, res) {
    const { emisor_correo, fullname, numero, mensaje } = req.body
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: 'envcodersperu@gmail.com',
            pass: 'ASD123asd'
        }
    }))
    const mailOptions = {
        from: emisor_correo,
        to: "envcodersperu@gmail.com",
        subject: fullname+' - Dice :',
        text: `Numero de contácto: ${numero} -- Mensaje: ' ${mensaje} -- correo ${emisor_correo}`
    } 
    await transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          res.send({ error: `El mensaje no se puedo enviar : ${error}` })
        } else {
          res.send({ message: 'El mensaje se envió correctamente' })
        }
    });
}

module.exports = {
    enviarCorreo
}
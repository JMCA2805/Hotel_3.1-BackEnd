const nodemailer = require('nodemailer')

enviarEmail = async (reserva) => {

    const config = {
        host: process.env.MAIL_HOST, // mx.example.com 
        port: process.env.MAIL_PORT, // 143 
        secureConnection: false, // TLS requires secureConnection to be false 
        auth: { 
            user: process.env.MAIL_ADDRESS, 
            pass: process.env.MAIL_PWD 
        }, 
        tls: { 
            ciphers:'SSLv3' 
        } 
    }

    const transport = nodemailer.createTransport(config)
    
    const mensaje = {
        from: process.env.MAIL_ADDRESS,
        to: reserva.correo,
        subject: `Reserva de Habitación ${reserva.tHabitacion}`,
        html: `
            <html>
                <body>
                    <h1> ${reserva.nombre} ${reserva.apellido} </h1>
                </body>
            </html>
        `
    }

    const info = await transport.sendMail(mensaje)
    
    console.log('Correo enviado correctamente')
}

module.exports = enviarEmail
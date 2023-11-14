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
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body {
                    font-family: Arial, sans-serif;

                    width: 100%;
                    margin: 0;
                    padding: 20px;

                }
                
                h1 {
                    color: #1d1a2f;
                }
                
                h2 {
                    color: #ff4081;
                }
                
                p {
                    margin: 10px 0;
                }
                
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    padding: 20px;
                    border-radius: 30px;
                    text-align: center;
                }

                .fondodegrade{
                    background: 
                    radial-gradient(
                      farthest-side at bottom left,
                      #965fd4, 
                      transparent
                    ),
                    radial-gradient(
                      farthest-corner at bottom right,
                      #3f6d4e, 
                      transparent 900px
                    );
                    padding: 20px;
                }

                .fondo{

                    margin: 0;
                    background: #1d1a2f;
                }
                
                .contact-info {
                    margin-top: 30px;
                    background-color: #311b92;
                    padding: 20px;
                    color: #ffffff;
                    border-radius: 5px;
                }
                
                .contact-info p {
                    margin-bottom: 10px;
                }
            </style>
        </head>
        <body>
        <div class="fondo"> 
        
        <div class="fondodegrade"> 
        
        <div class="container">

                <h1>Hotel Águila</h1>
                
                <h2>Confirmación de reserva de habitación ${reserva.tHabitacion}</h2>
                
                <p>Estimado(a) <strong>${reserva.nombre} ${reserva.apellido}</strong>, </p>
                
                <p>Gracias por elegir Hotel Águila para su estadía. A continuación, encontrará los detalles de su reserva:</p>
                
                <p><strong>Información personal:</strong></p>
                
                <p>Cédula: ${reserva.cedula}</p>
                <p>Teléfono: ${reserva.telefono}</p>
                
                <p><strong>Detalles de la reserva:</strong></p>
                
                <p>Fecha de ingreso: ${reserva.fechaEntrada}</p>
                <p>Fecha de salida: ${reserva.fechaSalida}</p>
                <p>Cantidad de personas: ${reserva.nPersonas}</p>
                <p>Tipo de habitación: ${reserva.tHabitacion}</p>
                
                <div class="contact-info">
                    <p>Para confirmar su reserva, por favor, comuníquese con nuestro equipo de atención al cliente:</p>
                    
                    <p>Teléfono: +584146528096 </p>
                    <p>Email: ${process.env.MAIL_ADDRESS}</p>
                </div>
                
                <p>¡Esperamos que disfrute de su estadía!</p>
                
                <p>Atentamente,</p>
                <p>Equipo de Hotel Águila</p>
            </div>
        
        </div>
        
        </div>
         
        </body>
        </html>
        `
    }

    const info = await transport.sendMail(mensaje)

    console.log('Correo enviado correctamente')
}

module.exports = enviarEmail

const nodemailer = require('nodemailer')
const Usuario = require('../models/user');

enviarEmail = async (reserva) => {

    const config = {
        host: process.env.MAIL_HOST, 
        port: process.env.MAIL_PORT, 
        secureConnection: false,  
        auth: { 
            user: process.env.MAIL_ADDRESS, 
            pass: process.env.MAIL_PWD 
        }, 
        tls: { 
            ciphers:'SSLv3',
            rejectUnauthorized: false
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


enviarOferta = async () => {

    let contador = 0
    const usuarios = await Usuario.find();

    const config = {
        host: process.env.MAIL_HOST, 
        port: process.env.MAIL_PORT, 
        secureConnection: false, 
        auth: { 
            user: process.env.MAIL_ADDRESS, 
            pass: process.env.MAIL_PWD 
        }, 
        tls: { 
            ciphers:'SSLv3',
            rejectUnauthorized: false
        } 
    }

    const transport = nodemailer.createTransport(config)
    

    for(i=0 ; i <usuarios.length ; i++){

        const mensaje = {
            from: process.env.MAIL_ADDRESS,
            to: usuarios[i].correo,
            subject: `Ofertas en Habitaciones`,
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
                        border: solid #8bd450;
                    }
            
                    .fondodegrade {
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
            
                    .fondo {
                        margin: 0;
                        background: #1d1a2f;
                    }
                    
                    .contact-info {
                        background-color: #311b92;
                        padding: 20px;
                        color: #ffffff;
                        border-radius: 5px;
                        border: solid #8bd450;
                    }
                    
                    .contact-info p {
                        margin-bottom: 10px;
                    }
                    ul{
                        list-style: none;
                        padding: 0;
                    }                 
                    p {
                        margin-bottom: 10px;
                    }
                </style>
            </head>
            <body>
                <div class="fondo"> 
                    <div class="fondodegrade"> 
                        <div class="container">
                            <h1>Hotel Águila</h1>
                            <h2>¡Promociones especiales!</h2>
                            <p>Estimado(a) <strong>${usuarios[i].nombre} ${usuarios[i].apellido}</strong>,</p>
                            <p>Aproveche nuestras ofertas exclusivas:</p>
                            <ul class="contact-info">
                                <li><strong>Descuento del 20% en estancias de más de 3 noches.</strong></li>
                                <li><strong>Paquete de spa y masajes con un 15% de descuento.</strong></li>
                                <li><strong>Desayuno buffet gratuito para niños menores de 12 años.</strong></li>
                            </ul>
                            <p>No pierda la oportunidad de disfrutar de estas increíbles promociones durante su estadía en Hotel Águila.</p>
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
    
        contador = contador + 1


    }

    console.log('Ofertas enviada correctamente, total: ' + contador)
}




module.exports = {enviarEmail, enviarOferta}

import nodemailer from 'nodemailer';
import { Router } from "express"

const SendEmail = Router();


SendEmail.post('/send-email', async (req, res) => {
  const { cliente, produto, preco, quantidade, total, destinatario } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'shopnowcorp@gmail.com',
      pass: 'piyrmtatpzaosspc',
    },
  });

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Confirmação de Compra - ShopNow</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                color: #333333;
            }

            .container {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #ffffff;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }

            h1 {
                color: #663399;
                font-size: 24px;
                margin-bottom: 20px;
            }

            p {
                margin-bottom: 10px;
            }

            .product-info {
                padding: 20px;
                background-color: #f8f8f8;
                border-radius: 5px;
            }

            .product-info h2 {
                color: #663399;
                font-size: 18px;
                margin-bottom: 10px;
            }

            .product-info p {
                margin-bottom: 5px;
            }

            .footer {
                margin-top: 20px;
                text-align: center;
            }

            .footer p {
                font-size: 12px;
                color: #888888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Confirmação de Compra - ShopNow</h1>

            <p>Olá, ${cliente}!</p>

            <p>Obrigado por comprar em nossa loja online. Seguem abaixo os detalhes da sua compra:</p>

            <div class="product-info">
                <h2>${produto}</h2>

                <p><strong>Preço:</strong> R$ ${preco}</p>
                <p><strong>Quantidade:</strong> ${quantidade}</p>
                <p><strong>Total:</strong> R$ ${total}</p>
            </div>

            <div class="footer">
                <p>Se você tiver alguma dúvida, entre em contato com nossa equipe de suporte.</p>
                <p>Atenciosamente, Equipe ShopNow</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: 'shopnowcorp@gmail.com',
    to: destinatario,
    subject: 'Confirmação de Compra - ShopNow',
    html: html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('E-mail enviado: %s', info.messageId);

    res.status(200).json({ message: 'E-mail enviado com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar o e-mail:', error);
    res.status(500).json({ message: 'Erro ao enviar o e-mail.' });
  }
});


export default SendEmail;
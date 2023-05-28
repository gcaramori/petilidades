import { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { serialize } from 'cookie';

const transporter = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  secure: false
} as SMTPTransport.Options);

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method === 'POST') {
    const { email } = req.body;

    let pin = '';

    for(let i = 0; i < 8; i++) {
      pin += Math.floor(Math.random() * 10);
    }

    const mailOptions = {
      from: 'petilidades@gmail.com',
      to: email,
      subject: 'Cadastrado com sucesso!',
      html: `Obrigado por se cadastrar, amigo! Segue seu PIN de acesso: ${pin}`,
    };

    try {
      res.setHeader('Set-Cookie', serialize('register_data', JSON.stringify({ email, pin }), { httpOnly: true, secure: true, path: '/' }));

      await transporter.sendMail(mailOptions);

      res.status(200).json({ status: 'ok' });
    } 
    catch(error) {
      res.status(500).json(error);
    }
  }
  else {
    res.status(500).json({ message: "Method not allowed!" });
  }
};
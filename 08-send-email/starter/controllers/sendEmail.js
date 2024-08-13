const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')

const sendEmailEth = async (req, res) => {
  let testAccount = await nodemailer.createTestAccount()
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'felicity.wiegand@ethereal.email',
      pass: 'ZRFGpRE7Yn9QqQvgQQ',
    },
  })
  const info = await transporter.sendMail({
    from: '"Abdoul" <abdoulramanediallo44@gmail.com>',
    to: 'bar@example.com',
    subject: 'Hello ✔',
    html: 'Hello world?',
  })
  res.json(info)
}

const sendEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: 'abdoulramanediallo44@gmail.com', // Change to your recipient
    from: 'viperaradra@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  }
  const info = await sgMail.send(msg)
  res.json(info)
}

module.exports = sendEmail

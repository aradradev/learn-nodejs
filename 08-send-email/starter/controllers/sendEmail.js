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

const sendEmail = async (req, res) => {}

module.exports = sendEmail

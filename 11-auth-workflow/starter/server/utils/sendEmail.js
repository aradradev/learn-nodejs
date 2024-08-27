const nodemailer = require('nodemailer')

const sendEmail = async () => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
      user: 'nola76@ethereal.email',
      pass: 'UtCbj8VUQjty37x4Af',
    },
  })

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Abdoul 👻" <abdoulramanediallo44@gmail.email>', // sender address
    to: 'bar@example.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?, testing', // plain text body
    html: '<b>Hello world?</b>', // html body
  })
}

module.exports = sendEmail

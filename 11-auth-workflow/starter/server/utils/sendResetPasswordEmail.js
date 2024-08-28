const sendEmail = require('./sendEmail')

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`
  const message = `
 <p>Please click the following link to reset password:
  <a href="${resetURL}">Reset Password</a>
 </p>
 `
  await sendEmail({
    to: email,
    subject: 'Reset Password',
    html: `
   <h4>Hello, ${name}</h4>
    ${message}
  `,
  })
}

module.exports = sendResetPasswordEmail

const sgMail = require('@sendgrid/mail')
require('../../secrets.js')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sendMail is a function!
// @to is the recipient of the email
// @from is the sender of the email
// @subject is subject
// @text is plain text message to be sent
// @html is html version of message
const sendEmail = (to, subject, text, html = '') => {
  const from = 'costumes@piroutes.com'
  const message = {
    to,
    from,
    subject,
    text,
    html,
  }
  try {
    sgMail.send(message)
    console.log(`Message sent to ${to} from ${from} about ${subject}`)
  } catch (err) {
    console.error('Error attempting to send email:', err)
  }
}

module.exports = sendEmail

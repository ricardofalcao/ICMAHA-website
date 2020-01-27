require('dotenv').config()

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: 'Method Not Allowed', headers: { 'Allow': 'POST' } }
    }

    const data = JSON.parse(event.body);
    if (!data.name || !data.email) {
      return { statusCode: 422, body: 'Name and email are required.' }
    }

    const msg = {
      to: 'mif@math.uminho.pt',
      from: 'noreply@ricardofalcao.pt',
      subject: `[ICMAHA] Registration - ${data.name}`,
      html: `
      <p><strong>Name: ${data.name}</strong></p>
      <p><strong>Email: ${data.email}</strong></p>
      `,
    };

    const response = await sgMail.send(msg);

    if(response) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: `success` })
      }
    }

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'error' })
    }
  } catch (err) {
    return { statusCode: 500, body: err.toString() }
  }
}

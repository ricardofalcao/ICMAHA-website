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
    if (!data.firstname || !data.lastname || !data.email || !data.affiliation) {
      return { statusCode: 422, body: 'Name, email and affiliation are required.' }
    }

    let htmlText = `
          <p><strong>Name:</strong> ${data.firstname} ${data.lastname}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Affiliation:</strong> ${data.affiliation}</p>
    `;

    if(data.title) {
      htmlText += `<p><strong>Title: </strong> ${data.title}</p>`
    }

    if(data.abstract) {
      htmlText += `<p><strong>Abstract: </strong> ${data.abstract}</p>`
    }

    const msg = {
      to: 'mif@math.uminho.pt',
      from: 'noreply@ricardofalcao.pt',
      subject: `[ICMAHA] Registration - ${data.firstname} ${data.lastname}`,
      html: htmlText,
    };

    const response = await sgMail.send(msg);

    msg.to = 'gtomaz@ipg.pt';
    response = await sgMail.send(msg);

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

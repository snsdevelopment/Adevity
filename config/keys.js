const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  session: {
    secret: process.env.session_secret,
  },
  exchange: {
    tenantId: process.env.MSEXCHANGE_TENANT_ID,
    clientId: process.env.MSEXCHANGE_CLIENT_ID,
    clientSecret: process.env.MSEXCHANGE_CLIENT_SECRET,
    sendFromEmail: process.env.MSEXCHANGE_SEND_FROM_EMAIL,
    sendToEmail: process.env.MSEXCHANGE_SEND_TO_EMAIL,
  },
  recaptcha: {
    // I could not find the secret for a while follow this thread:
    // https://stackoverflow.com/questions/66755108/recaptcha-secret-key-where-is-it-in-my-google-cloud-recaptcha-account
    // The first confusion was why my Google Cloud console called it CAPTCHA "Enterprise".
    //  But I will leave that exploration to you, as it doesn't matter in our case.
    // But I was finally able to get it to work. I found the secret under,
    // Legacy reCAPTCHA secret key
    secret: process.env.RECAPTCHA_SECRET,
  },
};

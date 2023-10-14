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
};

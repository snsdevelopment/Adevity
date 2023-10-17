const axios = require('axios');
const keys = require('../config/keys');

exports.sendEmail = async function sendEmail(name, email, subject, message) {
  try {
    const tenantID = keys.exchange.tenantId; // Get from Azure App Registration
    const oAuthClientID = keys.exchange.clientId; // Get from Azure App Registration
    const { clientSecret } = keys.exchange; // Get from Azure App Registration
    let oAuthToken; // declared, gets defined if successfully fetched. Refresh token
    const userFrom = keys.exchange.sendFromEmail;

    const { sendToEmail } = keys.exchange;

    const toRecipientsArray = [];

    toRecipientsArray.push({ emailAddress: { address: sendToEmail.trim() } });

    oAuthToken = await axios({ // Get OAuth token to connect as OAuth client
      method: 'post',
      url: `https://login.microsoftonline.com/${tenantID}/oauth2/token`,
      data: new URLSearchParams({
        client_id: oAuthClientID,
        client_secret: clientSecret,
        resource: 'https://graph.microsoft.com',
        grant_type: 'client_credentials',
      }).toString(),
    });

    oAuthToken = oAuthToken.data.access_token;

    const msgPayload = {
    // Ref: https://learn.microsoft.com/en-us/graph/api/resources/message#properties
      message: {
        subject,
        body: {
          contentType: 'HTML',
          content: message,
        },
        toRecipients: toRecipientsArray,
      },
    };

    await axios({ // Send email using Microsoft Graph
      method: 'post',
      url: `https://graph.microsoft.com/v1.0/${userFrom}/sendMail`,
      data: msgPayload,
      headers: {
        Authorization: `Bearer ${oAuthToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Email sent');
    return true;
  } catch (error) {
    console.trace(error);
    return false;
  }
};

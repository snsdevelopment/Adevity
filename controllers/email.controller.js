const axios = require('axios');
const emailServices = require('../services/email.services');
const keys = require('../config/keys');

exports.sendEmail = async (req, res) => {
  const {
    name, email, subject, message, 'g-recaptcha-response': recaptchaToken,
  } = req.body;
  try {
    const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${keys.recaptcha.secret}&response=${recaptchaToken}`);
    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed' });
    }
    const respose = await emailServices.sendEmail(name, email, subject, message);

    if (!respose) return res.status(500).json({ message: 'Error sending email' });

    res.status(200).json('OK');
  } catch (error) {
    console.trace(error);
    res.status(500).json('Error sending email');
  }
};

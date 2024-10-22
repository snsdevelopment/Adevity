const axios = require('axios');
const emailServices = require('../services/email.services');
const keys = require('../config/keys');

/**
 * This form uses Google reCAPTCHA v3, which doesn't require a visible "I'm not a robot" checkbox.
 * Unlike reCAPTCHA v2, v3 operates invisibly in the background
 * and scores user behavior to determine if the user is human.
 * We generate a reCAPTCHA token during form submission using `grecaptcha.enterprise.execute()`.
 * The token is then added directly to the `FormData` object to
 * ensure it's passed to the server for verification.
 * Note: reCAPTCHA v3 doesn't show a challenge unless suspicious activity is
 * detected, so users won't see any "I'm not a robot" prompt.
 *
 * Free up to 10,000 assessments per month*.
 * https://cloud.google.com/recaptcha/docs/compare-tiers
 */

exports.sendEmail = async (req, res) => {
  const {
    name, email, subject, message, 'g-recaptcha-response': recaptchaToken,
  } = req.body;

  try {
    // Verify the token with Google reCAPTCHA API
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${keys.recaptcha.secret}&response=${recaptchaToken}`,
    );

    // Log the full recaptcha response to see what is returned from Google
    console.log('reCAPTCHA verification response:', recaptchaResponse.data);

    // Check if the reCAPTCHA verification was successful
    if (!recaptchaResponse.data.success) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed', error: recaptchaResponse.data['error-codes'] });
    }

    // Proceed to send the email
    const response = await emailServices.sendEmail(name, email, subject, message);
    if (!response) {
      return res.status(500).json({ message: 'Error sending email' });
    }

    // Return success response
    return res.status(200).send('OK');
  } catch (error) {
    console.trace(error);
    return res.status(500).json('Error sending email');
  }
};

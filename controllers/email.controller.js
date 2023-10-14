const emailServices = require('../services/email.services');

exports.sendEmail = async function sendEmail(req, res) {
  const {
    name, email, subject, message,
  } = req.body;
  try {
    const respose = await emailServices.sendEmail(name, email, subject, message);

    if (!respose) return res.status(500).json({ message: 'Error sending email' });

    res.status(200).json({ message: 'Email sent' });
  } catch (error) {
    console.trace(error);
    res.status(500).json({ message: 'Error sending email' });
  }
};

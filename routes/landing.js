const express = require('express');

const router = express.Router();

const emailController = require('../controllers/email.controller');
// security.canAccessPage(['LANDING']) -- Not checking this because if we add this
// it will result in an infinite loop is a user is able to login but not access the landing page

router.get('/', async (req, res) => {
  res.render('landing', { title: 'Landing Page' });
});

router.get('/services', async (req, res) => {
  res.render('services', { title: 'Landing Page' });
});

router.post('/sendEmail', emailController.sendEmail);

module.exports = router;

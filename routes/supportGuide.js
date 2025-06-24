const express = require('express');

const router = express.Router();

router.get('/supportGuide', (req, res) => {
  res.render('supportGuide/supportGuide', {
    hideEverythingBesidesHome: true,
  });
});

module.exports = router;

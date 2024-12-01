const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('floorplan/index', { title: 'Floor Plan - Coming Soon' });
});

module.exports = router;

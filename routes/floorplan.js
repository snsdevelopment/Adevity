const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('floorplan/floorplan', { title: 'Floor Plan - Coming Soon' });
});

module.exports = router;

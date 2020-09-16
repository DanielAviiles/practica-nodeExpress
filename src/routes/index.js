const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  res.render('layouts/home');
});

module.exports = router;
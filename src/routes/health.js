const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({ status: 'alive' });
  });

  router.post('/', (req, res) => {
    res.json({ status: 'alive' });
  });

module.exports = router;

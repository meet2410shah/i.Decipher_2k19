const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.send(`
      <h1>Thank You..</h1>
    `);
});

module.exports = router;

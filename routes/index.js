const express = require('express');
const jokesRouter = require('./jokes');

const router = express.Router();

router.use('/jokes', jokesRouter);

module.exports = router;

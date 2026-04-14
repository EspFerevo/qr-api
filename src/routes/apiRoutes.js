const express = require('express');
const router = express.Router();
const QRController = require('../controllers/qrController');
const { validateURL } = require('../middleware/validator');

/**
 * Route for generating QR codes.
 * GET /api/generate?url=...
 */
router.get('/generate', validateURL, QRController.generateQR);

module.exports = router;

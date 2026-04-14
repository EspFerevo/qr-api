const QRService = require('../services/qrService');

/**
 * Controller for QR-related endpoints.
 */
class QRController {
    /**
     * GET /api/generate
     * Generates QR codes from a given URL.
     */
    static async generateQR(req, res, next) {
        const { url } = req.query;

        try {
            const data = await QRService.generate(url);
            res.json(data);
        } catch (err) {
            // Forward the error to our centralized error handler
            next(err);
        }
    }
}

module.exports = QRController;

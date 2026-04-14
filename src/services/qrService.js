const QRCode = require('qrcode');

/**
 * Service for generating QR codes in various formats.
 */
class QRService {
    /**
     * Generates PNG and SVG representation of a URL.
     * @param {string} url - The URL or text to encode.
     * @param {object} options - Generation options (width, margin, etc.)
     * @returns {Promise<{png: string, svg: string}>}
     */
    static async generate(url, options = { width: 400, margin: 2 }) {
        const [png, svg] = await Promise.all([
            QRCode.toDataURL(url, options),               // PNG as Base64
            QRCode.toString(url, { ...options, type: 'svg' }) // SVG as XML string
        ]);

        return { png, svg };
    }
}

module.exports = QRService;

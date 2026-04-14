/**
 * Validator middleware for URL parameters.
 */
function validateURL(req, res, next) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ error: 'URL is required.' });
    }

    try {
        new URL(url);
        next();
    } catch (err) {
        if (typeof url !== 'string' || url.trim().length === 0) {
            return res.status(400).json({ error: 'Please enter a valid text or URL.' });
        }
        next();
    }
}

module.exports = { validateURL };

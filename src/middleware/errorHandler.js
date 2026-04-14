/**
 * Centralized error handling middleware.
 */
function errorHandler(err, req, res, next) {
    console.error(`[Error]: ${err.stack || err.message}`);

    const status = err.status || 500;
    const message = err.message || 'Generation failed';

    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
}

module.exports = errorHandler;

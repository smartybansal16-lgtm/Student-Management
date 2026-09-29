// Custom Logger Middleware
// Logs the HTTP method, request URL, and timestamp for every incoming request

function logger(req, res, next) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next(); // pass control to the next middleware/route handler
}

module.exports = logger;

const HttpError = require('../helpers/HttpError');

function errorHandler(err, req, res, next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  if (err.name === 'MulterError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === 'Invalid file type') {
    return res.status(400).json({ message: 'Invalid file type. Only JPEG, PNG and WebP images are allowed.' });
  }

  if (err.message === 'File is required') {
    return res.status(400).json({ message: 'File is required' });
  }

  return res.status(500).json({ message: 'Internal Server Error' });
}

module.exports = errorHandler;

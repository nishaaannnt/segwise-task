// custom error handler 
// so if any api throws unhandled error. we use this

const handleError = (err, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  console.log('Error:', message);

  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports =  handleError;
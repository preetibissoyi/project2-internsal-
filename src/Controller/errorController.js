const validationErrorHandler = (error) => {
  error.statusCode = 400;
  error.status = false;
  error.msg = "Validation failed";
};

const duplicateErrorHandler = (error) => {
    error.statusCode = 409;
    error.status = false;
    error.msg = "Duplicate key error";
}

exports.globalErrorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    validationErrorHandler(err);
    }
    if (err.code === 11000) {
        duplicateErrorHandler(err)
    }
  res.status(err.statusCode || 500).json({
    status: err.status,
    data: {
      msg: err.msg,
      error: err.message,
    },
  });
};

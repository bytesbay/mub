const errorHandler = function(err, req, res, next) {

  console.error(err);

  if(err.name == 'InvalidInputError') {
    res.status(err.code).send({
      err: err.errors
    });
  }
  else {
    res.status(500).send({
      err: 'Server error, sorry'
    });
  }
};


export { errorHandler }

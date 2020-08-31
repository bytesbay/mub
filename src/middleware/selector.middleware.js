const selectorMiddleware = async function(req, res, next) {

  if(!req.body.params) {
    req.body.params = {};
  }

  const params = req.body.params;

  if(!params.take || params.take > 32) {
    params.take = 20;
  }
  if(!params.direction || ![ '-', '+' ].includes(params.direction)) {
    params.direction = '-';
  }
  if(!params.sort_by) {
    params.sort_by = '_id';
  }
  if(!params.page || params.page <= 0) {
    params.page = 1;
  }

  params.sort = params.direction + params.sort_by;

  next();

}

export { selectorMiddleware }

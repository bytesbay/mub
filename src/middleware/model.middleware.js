import { InvalidInputError } from 'src/errors/invalid-input.error'
import Mongoose from 'mongoose'

/**
 * 
 * @param {String} model 
 */
const modelMiddleware = function (model) {


  return async function(req, res, next) {
    try {
      const param = req.params[model.toLowerCase()];
  
      if(!param) {
        throw new InvalidInputError(`Wrong ${param} ID`);
      }

      // TODO
      const doc = await Mongoose.model(model).findOne({ _id: param });
  
      if(!doc) {
        throw new InvalidInputError(`${model} not found`, 404);
      }
  
      req.params[model] = doc;
  
      next();
    } catch (error) {
      next(error);
    }
  }
}

export { modelMiddleware }
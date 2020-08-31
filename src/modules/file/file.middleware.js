const File = require('./file.model');
const InvalidInputError = require('#/errors/invalid-input.error');

module.exports = {


  handle(opts) {

    return async function (req, res, next) {
      
      try {
        for (const key in opts) {
          if (!req.body[key] && opts[key].required) {
            throw new InvalidInputError({
              name: key,
              message: 'File is required'
            });
          }
  
  
          if (req.body[key] && opts[key].parse) {
            req.body[key] = await File.findById(req.body[key]);

  
            if(!req.body[key] && !opts[key].not_important) {
              throw new InvalidInputError({
                name: key,
                message: 'File expried'
              });
            } else {
              if (opts[key].image) {
                if(!req.body[key].isImage()) {
                  throw new InvalidInputError({
                    name: key,
                    message: 'File is not an image'
                  });
                }
              }
            }
          }
        }

        next();
        
      } catch (err) {
        next(err)
      }
    }
  },
};

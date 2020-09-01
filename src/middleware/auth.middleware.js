import { AuthService } from 'src/modules/auth/auth.service';
import { InvalidInputError } from 'src/errors/invalid-input.error'

const authMiddleware = async function(req, res, next) {

  if(!process.env['AUTH_URL']) {
    req.user_id = 'none';
    return next();
  }

  var auth = req.headers.authorization;
  
  if(!auth) {
    throw new InvalidInputError('Unauthorized', 401);
  } else {
    auth = auth.split(' ')[1] || auth;
  }
  
  try {
    var id = await AuthService.auth(auth);
  } catch (error) {
    console.error(error);
    throw new InvalidInputError('Unauthorized!', 401);
  }
  
  req.user_id = id;
  next();
}

export { authMiddleware }
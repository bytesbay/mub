import { InvalidInputError } from 'src/errors/invalid-input.error'
import { Auth } from './auth.model';
import { RequestService } from './request.service';

const AuthService = {

  async auth(token) {

    const user_id = await this._localAuth(token);

    if(user_id) {
      return user_id;
    } else {
      const user_id = await RequestService.request(token);
      await this._saveAuth(token, user_id)
      return user_id;
    }
  },

  async _localAuth(token) {
    const auth = Auth.findOne({ token });
    return auth ? auth.data.user_id : null;
  },

  async _saveAuth(token, user_id) {
    return await Auth.create(token, user_id);
  },
}

export { AuthService }
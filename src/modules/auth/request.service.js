import { InvalidInputError } from 'src/errors/invalid-input.error'
import { Auth } from './auth.model';
import Axios from 'axios';

const RequestService = {


  async request(token) {
    if(process.env['MOCK_AUTH']) {
      return await this._mockRequest(token);
    } else {
      return this._authRequest(token);
    }
  },

  async _authRequest(token) {
    return await Axios.get(process.env['AUTH_URL'], {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.data.id);
  },

  _mockRequest(token) {
    return 'qwe-qwe-qweqweqwe'
  }
}

export { RequestService }
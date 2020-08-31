import { InvalidInputError } from 'src/errors/invalid-input.error'
import Axios from 'axios';

const AuthService = {


  async auth(token) {
    return await Axios.get(process.env['SERVICE_API_URL'] + '/api/gateway/user', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.data);
  }
}

export { AuthService }
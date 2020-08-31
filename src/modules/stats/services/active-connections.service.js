import { InvalidInputError } from 'src/errors/invalid-input.error'
import { clients } from 'src/config/ws-server';

const ActiveConnectionsService = {


  async getNumber() {
    return clients.length;
  },
}

export { ActiveConnectionsService }
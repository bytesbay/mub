import { AuthSchema } from './auth.schema';

const Auth = {

  async create(token, user_id) {

    const item = {
      id: Math.UUID(),
      token: token,
      user_id: user_id,
      created_at: new Date(),
    };

    await $config.db.get('auths')
      .push(item)
      .write();

    return new AuthSchema(item);
  },


  find(where) {
    const items = $config.db.get('auths')
      .filter(where)
      .value();

    return items.map(n => new AuthSchema(n));
  },


  findOne(where) {
    const item = $config.db.get('auths')
      .find(where)
      .value();

    return item ? new AuthSchema(item) : null;
  },
};

export { Auth }
import FS from 'fs';

import { FileSchema } from './file.schema';

const TIME_TO_EXPIRE = 24 * 60 * 60 * 1000;

const File = {

  async create(data) {

    const item = {
      id: Math.UUID(),
      created_at: new Date(),
      ...data,
    };

    await $config.db.get('files')
      .push(item)
      .write();

    return new FileSchema(item);
  },


  find(where) {
    const items = $config.db.get('files')
      .find(where)
      .value();

    return items.map(n => new FileSchema(n));
  },


  async purgeExpired() {
    const past_date = Date.now() - TIME_TO_EXPIRE;

    const files = $config.db.get('files')
      .filter(n => new Date(n.created_at).getTime() < past_date)
      .value();

    for (const i in files) {
      const n = new FileSchema(files[i])
      await n.delete();
    }
  },


  findOne(where) {
    const items = $config.db.get('files')
      .find(where)
      .value();

    if(items[0]) {
      return new FileSchema(items[0]);
    } else {
      return null;
    }    
  },
};

export { File }

import { InvalidInputError } from 'src/errors/invalid-input.error'
import { File } from './file.model';
import { FileSchema } from './file.schema';

const FileService = {


  async create(user_id, file) {
    const item = await File.create({
      name: file.originalname,
      meta: {
        mimetype: file.mimetype,
        encoding: file.encoding,
        size: file.size
      },
      user: user_id,
      path: file.path,
      tmp_name: file.filename,
    });

    return item;
  },


  async deleteAll(user_id) {
    const files = $config.db.get('files')
      .filter(n => n.user === user_id)
      .value();

    for (const i in files) {
      const n = new FileSchema(files[i])
      await n.delete();
    }
  },


  async delete(file_id, user_id) {
    const file = $config.db.get('files')
      .find(n => n.id === file_id && n.user === user_id)
      .value();

    if(file) {
      const n = new FileSchema(file)
      await n.delete();
    }
  },

  async selectAll(user_id) {
    const files = $config.db.get('files')
      .find(n => n.user === user_id)
      .value();

    return files;
  },
}

export { FileService }
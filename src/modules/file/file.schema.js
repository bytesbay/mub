import FS from 'fs';

class FileSchema {

  constructor(item) {
    item.created_at = new Date(item.created_at);
    this.data = item;
  }

  async delete() {

    try {
      FS.unlinkSync(this.data.path);
    } catch (error) {
      console.error('No file found', error);
    }

    await $config.db.get('files')
      .remove({ id: this.data.id })
      .write()
  }

  async save() {
    await $config.db.get('auths')
      .find({ id: this.data.id })
      .assign(this.data)
      .write()
  }
}


export { FileSchema }
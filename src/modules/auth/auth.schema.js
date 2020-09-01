class AuthSchema {

  constructor(item) {
    item.created_at = new Date(item.created_at);
    this.data = item;
  }

  delete() {
    $config.db.get('auths')
      .remove({ id: this.data.id })
      .write()
  }

  save() {
    $config.db.get('auths')
      .find({ id: this.data.id })
      .assign(this.data)
      .write()
  }
}


export { AuthSchema }
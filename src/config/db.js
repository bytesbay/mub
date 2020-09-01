import LowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('/data/mub/db.json')
$config.db = LowDB(adapter)

const connect = async function () {
  await $config.db.defaults({ files: [], auths: [] })
    .write()
}

export { connect }
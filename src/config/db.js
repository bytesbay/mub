import LowDB from 'lowdb'
import FileSync from 'lowdb/adapters/FileSync'

const adapter = new FileSync('/data/db.json')
$config.db = LowDB(adapter)

const connect = async function () {
  $config.db.defaults({ files: [], auths: {}, count: 0 })
    .write()
}

export { connect }
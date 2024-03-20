import mysql from 'mysql2/promise'
import config from '../config'

let connectionDB: any

(async () => {
  connectionDB = await mysql.createConnection(config.mysql)
})().catch(err => {
  console.error(err)
})

export { connectionDB }

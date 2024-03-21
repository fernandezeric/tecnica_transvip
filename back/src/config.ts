import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGO_URL ?? ''
const MYSQL_HOST = process.env.MYSQL_HOST ?? ''
const MYSQL_USER = process.env.MYSQL_USER ?? ''
const MYSQL_PORT = process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD ?? ''
const MYSQL_DATABASE = process.env.MYSQL_DATABASE ?? ''
const SERVER_PORT = process.env.PORT ? Number(process.env.PORT) : 3000

const config = {
  mysql: {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    port: MYSQL_PORT,
    password: MYSQL_PASSWORD,
    database: MYSQL_DATABASE
  },
  mongo: {
    url: MONGO_URL
  },
  server: {
    port: SERVER_PORT
  }
}

export default config

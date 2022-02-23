import dotenv from 'dotenv'

dotenv.config()
const APP_ENV = process.env.ENV ?? 'dev'

const database = process.env[APP_ENV === 'test' ? 'POSTGRES_TEST_DB' : 'POSTGRES_DB'] ?? 'postgres'

const databaseConfig = {
  host: process.env.POSTGRES_HOST ?? 'localhost',
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  database
}

export default databaseConfig

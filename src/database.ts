import { Pool } from 'pg'

import dbConfig from './config/database.config'

export const client = new Pool({
  host: dbConfig.host,
  port: dbConfig.port as unknown as number,
  database: dbConfig.database,
  user: dbConfig.username,
  password: dbConfig.password
})

export const applyQueryWithParams = async (sql: string, params: any) => {
  const connection = await client.connect()
  const result = await connection.query(sql, params)
  connection.release()
  return result
}

export const applyQuery = async (sql: string) => {
  const connection = await client.connect()
  const result = await connection.query(sql)
  connection.release()
  return result
}

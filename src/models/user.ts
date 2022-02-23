/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt'

import { applyQuery, applyQueryWithParams } from '../database'
import appConfig from '../config/app.config'

export type User = {
  id: Number
  firstname: string
  lastname: string
  password: string
}

const BCRYPT_PASSWORD = appConfig.bcryptPaper
const SALT_ROUNDS = appConfig.bcryptSalt

export class UserDBModel {
  async index(): Promise<User[]> {
    try {
      const usersSQL = 'SELECT * FROM users'
      const usersSQLResult = await applyQuery(usersSQL)
      return usersSQLResult.rows
    } catch (error) {
      throw new Error(`Couldn't get the users. Error: ${error}`)
    }
  }

  async show(id: number): Promise<User> {
    try {
      const userSQL = 'SELECT * FROM users WHERE id=($1)'
      const userSQLResult = await applyQueryWithParams(userSQL, [id])
      return userSQLResult.rows[0]
    } catch (error) {
      throw new Error(`Couldn't find user. Error: ${error}`)
    }
  }

  async create(firstName: string, lastName: string, password: string): Promise<User> {
    try {
      const salt = SALT_ROUNDS ? Number(SALT_ROUNDS) : 10
      const hashedPassword = bcrypt.hashSync(password + BCRYPT_PASSWORD, salt)
      const userCreationSQL =
        'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
      const userCreationSQLResult = await applyQueryWithParams(userCreationSQL, [
        firstName,
        lastName,
        hashedPassword
      ])
      return userCreationSQLResult.rows[0]
    } catch (error) {
      throw new Error(`Couldn't create user. Error: ${error}`)
    }
  }

  async getUserOrders(userId: number): Promise<{ id: Number; status: string; quantity: number }[]> {
    try {
      const userOrdersSQL = `SELECT orders.id, orders.status, order_products.quantity
        FROM orders
        JOIN order_products ON orders.id = order_products.order_id
        where orders.user_id = ($1) and orders.status = 'active'`

      const userOrdersSQLResult = await applyQueryWithParams(userOrdersSQL, [userId])
      return userOrdersSQLResult.rows
    } catch (error) {
      throw new Error(`Couldn't get orders. Error: ${error}`)
    }
  }
}

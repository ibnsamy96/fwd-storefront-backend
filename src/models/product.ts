/* eslint-disable class-methods-use-this */
import { applyQuery, applyQueryWithParams } from '../database'

export type Product = {
  id: Number
  name: string
  price: number
  category: string
}

export class ProductDBModel {
  async index(): Promise<Product[]> {
    try {
      const productsSQL = 'SELECT * FROM products'
      const productsSQLResult = await applyQuery(productsSQL)
      return productsSQLResult.rows
    } catch (error) {
      throw new Error(`Couldn't get the products. Error: ${error}`)
    }
  }

  async show(id: number): Promise<Product> {
    try {
      const productSQL = 'SELECT * FROM products WHERE id=($1)'
      const productSQLResult = await applyQueryWithParams(productSQL, [id])
      return productSQLResult.rows[0]
    } catch (error) {
      throw new Error(`Couldn't find the product. Error: ${error}`)
    }
  }

  async create(name: string, price: number, category: string): Promise<Product> {
    try {
      const productCreationSQL =
        'INSERT INTO products (name, price,category) VALUES($1, $2, $3) RETURNING *'
      const productCreationSQLResult = await applyQueryWithParams(productCreationSQL, [
        name,
        price,
        category
      ])
      return productCreationSQLResult.rows[0]
    } catch (error) {
      throw new Error(`Couldn't create the product. Error: ${error}`)
    }
  }
}

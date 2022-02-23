/* eslint-disable class-methods-use-this */
import format from 'pg-format'

import { applyQuery, applyQueryWithParams } from '../database'

export type Order = {
  id: Number
  userId: Number
  status: string
}

export type OrderProducts = {
  product_id: Number
  quantity: number
  order_id?: undefined | number
}

export class OrderDBModel {
  async create(
    status: string,
    userId: number,
    orderProducts: OrderProducts[]
  ): Promise<OrderProducts[]> {
    try {
      const orderSQL = 'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING id'
      const orderSQLResult = await applyQueryWithParams(orderSQL, [status, userId])

      const orderProductsInfo = orderProducts.map((orderProduct) => [
        orderProduct.product_id,
        orderProduct.quantity,
        orderSQLResult.rows[0].id
      ])

      const appendedOrderProducts = await applyQuery(
        format(
          'INSERT INTO order_products (product_id, quantity, order_id) VALUES %L',
          orderProductsInfo
        )
      )
      return appendedOrderProducts.rows
    } catch (error) {
      throw new Error(`Couldn't create order. Error: ${error}`)
    }
  }
}

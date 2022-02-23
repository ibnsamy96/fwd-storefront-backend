/* eslint-disable class-methods-use-this */
import { applyQueryWithParams } from '../database'

export default class DashboardQueries {
  async getUserOrders(userId: number): Promise<{ id: Number; status: string; quantity: number }[]> {
    try {
      const DashboardSQL = `SELECT orders.id, orders.status, order_products.quantity
        FROM orders
        JOIN order_products ON orders.id = order_products.order_id
        where orders.user_id = ($1) and orders.status = 'active'`

      const DashboardSQLResult = await applyQueryWithParams(DashboardSQL, [userId])
      return DashboardSQLResult.rows
    } catch (error) {
      throw new Error(`Couldn't get orders. Error: ${error}`)
    }
  }
}

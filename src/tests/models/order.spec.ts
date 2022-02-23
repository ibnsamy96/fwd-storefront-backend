import { OrderDBModel } from '../../models/order'

const order = new OrderDBModel()

describe('Order Model', () => {
  it('should have a create method', () => {
    expect(order.create).toBeDefined()
  })

  // it('create method should create new order with new associated order_product', async () => {
  //   const orderProduct = { product_id: 1, quantity: 1 }
  //   const result = await order.create('active', 2, [orderProduct])
  //   expect(result).toEqual([])
  // })
})

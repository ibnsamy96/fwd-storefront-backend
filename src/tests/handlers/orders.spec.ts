import supertest from 'supertest'
import jwt from 'jsonwebtoken'

import { User } from '../../models/user'
import app from '../../server'
import { Product } from '../../models/product'
import appConfig from '../../config/app.config'

const request = supertest(app)
let user: User
let product: Product
let token: string = ''

beforeAll(async () => {
  await request
    .post('/users')
    .send({
      firstName: 'user',
      lastName: 'last',
      password: 'password'
    })
    .then((response) => {
      token = response.body
      const decodedJwt = jwt.verify(token, appConfig.jwtSecret as string) as {
        user: { id: number; firstname: string; lastname: string; password: string }
      }

      user = decodedJwt.user
    })

  await request
    .post('/products')
    .set('Authorization', `Bearer ${token}`)
    .send({
      name: 'new product',
      price: 250,
      category: 'product type'
    })
    .then((response) => {
      product = response.body
    })
})

describe('Order Endpoints', () => {
  it('should add a new order', async () => {
    const response = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        status: 'active',
        user_id: user.id,
        order_products: [
          {
            product_id: product.id,
            quantity: 1
          }
        ]
      })
    expect(response.status).toEqual(200)
  })
})

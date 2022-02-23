// import { ProductStore } from '../../models/product';
import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
let token: string = ''

beforeAll((done) => {
  request
    .post('/users')
    .send({
      firstname: 'firstname',
      lastName: 'lastName',
      password: 'password'
    })
    .end((err: any, response: any) => {
      token = response.body
      done()
    })
})

describe('Product Endpoints', () => {
  let productId: number

  it('add a new product', async () => {
    const response = await request.post('/products').set('Authorization', `Bearer ${token}`).send({
      name: 'new product',
      price: 250,
      category: 'product type'
    })
    const { id, ...result } = response.body
    productId = id

    expect(result).toEqual({
      name: 'new product',
      price: 250,
      category: 'product type'
    })
  })

  it('return a list of products', async () => {
    const result = await request.get('/products')
    result.body.forEach(
      (product: { id: number; name: string; price: number; category: string }, index: number) => {
        const { id, ...productInfo } = product
        expect(productInfo).toEqual({
          name: 'new product',
          price: 250,
          category: 'product type'
        })
      }
    )
  })

  it('should return the correct product', async () => {
    const result = await request.get(`/products/${productId}`)
    expect(result.body).toEqual({
      id: productId,
      name: 'new product',
      price: 250,
      category: 'product type'
    })
  })
})

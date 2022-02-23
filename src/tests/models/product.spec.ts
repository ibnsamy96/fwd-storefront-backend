// import supertest from 'supertest'

// import app from '../../server'
import { ProductDBModel } from '../../models/product'

const product = new ProductDBModel()
// const request = supertest(app)

// TODO Try to remove beforeAll
// eslint-disable-next-line no-unused-vars
// let token: string = ''
// beforeAll((done) => {
//   request
//     .post('/users')
//     .send({
//       firstname: 'user_first_name',
//       lastname: 'user_first_name',
//       password: 'password'
//     })
//     .end((err: any, response: any) => {
//       token = response.body
//       done()
//     })
// })

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(product.index).toBeDefined()
  })

  it('should have a show method', () => {
    expect(product.show).toBeDefined()
  })

  it('should have a create method', () => {
    expect(product.create).toBeDefined()
  })

  it('create method should add a product', async () => {
    let response: unknown

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 4; i++) {
      // eslint-disable-next-line no-await-in-loop
      response = await product.create('new product', 250, 'product type')
    }
    const { id, ...productInfo } = response as {
      id: number
      name: string
      price: number
      category: string
    }
    expect(productInfo).toEqual({
      name: 'new product',
      price: 250,
      category: 'product type'
    })
  })

  it('index method should return a list of products', async () => {
    const result = await product.index()

    result.forEach((returnedProduct) => {
      const { id, ...productInfo } = returnedProduct
      expect(productInfo.name).toBeDefined()
      expect(productInfo.price).toBeDefined()
    })
    // expect(result).toEqual([
    //   {
    //     id: 1,
    //     name: 'new product',
    //     price: 250,
    //     category: 'product type'
    //   },
    //   {
    //     id: 2,
    //     name: 'new product',
    //     price: 250,
    //     category: 'product type'
    //   },
    //   {
    //     id: 3,
    //     name: 'new product',
    //     price: 250,
    //     category: 'product type'
    //   },
    //   {
    //     id: 4,
    //     name: 'new product',
    //     price: 250,
    //     category: 'product type'
    //   }
    // ])
  })

  it('show method should return the correct product', async () => {
    const result = await product.show(1)
    expect(result).toEqual({
      id: 1,
      name: 'new product',
      price: 250,
      category: 'product type'
    })
  })
})

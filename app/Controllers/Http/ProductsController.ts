// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from '@adonisjs/http-server/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Product from 'App/Models/Product'
import ProductCategory from 'App/Models/ProductCategory'
import { validatePut, validateCreate } from 'App/helpers/authvalidator'
import token from 'App/Models/token'
import users from 'App/Models/auth'

export default class ProductsController {
  public async index({ auth, response }: HttpContext & HttpContextContract) {
    try {
      const token = (await auth?.user) as token
      const product = await Product.query().where('user_id', token.id)
      return { data: product }
    } catch (error) {
      response.notFound({ error: 'Please try again ' })
    }
  }

  public async getOneProduct({ auth, response, request }: HttpContext & HttpContextContract) {
    try {
      const token = (await auth?.user) as token
      const product = await Product.query().where('user_id', token.id).where('id', request.qs().id)
      return { data: product }
    } catch (error) {
      response.notFound({ error: 'Please try again ' })
    }
  }

  public async postProduct({ request, response }: HttpContext) {
    try {
      let product = new Product()
      let check = await request.validate({ schema: validateCreate })
      let category = await ProductCategory.findBy('id', check.product_category_id)
      await category
        ?.related('productsubcategories')
        .query()
        .where('product_category_id', category.id)
      await users.findByOrFail('id', check.user_id)
      product = Object.assign(product, check)
      await product.save()
      return { message: 'product saved', status: 'success', data: product.$attributes }
    } catch (error) {
      response.badRequest({ message: 'Please check inputs', error: error.message })
    }
  }

  public async deleteProduct({ auth, request, response }: HttpContext & HttpContextContract) {
    try {
      const token = auth.user as token
      if (
        !(await Product.query().where('id', request.qs().id).where('user_id', token.id).delete())
      ) {
        throw new Error("couldn't delete")
      }
      return { message: 'product deleted: ', status: 'success' }
    } catch (error) {
      response.badRequest({ message: 'Please try again', error: error.message })
    }
  }

  public async updateProduct({ auth, request, response }: HttpContext & HttpContextContract) {
    try {
      const token = auth.user as token
      const check = await request.validate({ schema: validatePut })
      const product = await Product.query()
        .where('id', request.qs().id)
        .where('user_id', token.id)
        .update({ ...check })
      return { message: 'product updated', status: 'success', data: product }
    } catch (error) {
      response.badRequest({ message: 'Please try again', error: error })
    }
  }
}

import ProductSubCategorie from 'App/Models/ProductSubCategory'
import ProductCategory from 'App/Models/ProductCategory'
import { validateCat, validateSubCat } from 'App/helpers/authvalidator'
import { HttpContext } from '@adonisjs/http-server/build/standalone'

export default class CategoriesController {
  public async categories({ request, response }: HttpContext) {
    try {
      const productcategory = new ProductCategory()
      let check = await request.validate({ schema: validateCat })
      productcategory.name = check.name
      productcategory.status = check.status ? true : false
      await productcategory.save()
      return { message: 'categories saved', status: 'success' }
    } catch (error) {
      response.badRequest({ message: 'Please check inputs' + error })
    }
  }

  public async subCategories({ request, response }: HttpContext) {
    try {
      const productsubcategorie = new ProductSubCategorie()
      let check = await request.validate({ schema: validateSubCat })
      const product_id = await ProductCategory.findByOrFail('id', check.product_category_id)
      productsubcategorie.name = check.name
      productsubcategorie.product_category_id = product_id.id
      productsubcategorie.status = check.status ? true : false
      await productsubcategorie.save()
      return { message: 'categories saved', status: 'success' }
    } catch (error) {
      response.badRequest({ message: 'Please check inputs' })
    }
  }
}

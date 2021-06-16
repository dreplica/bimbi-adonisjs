import { BaseModel, column, hasMany, HasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import ProductSubCategory from './ProductSubCategory'

export default class ProductCategory extends BaseModel {
  public static table = 'product_category'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public status: boolean

  @hasMany(() => ProductSubCategory, {
    foreignKey:"product_category_id",
    localKey:"id"
  })
  public productsubcategories: HasMany<typeof ProductSubCategory>

  @manyToMany(()=>Product)
  public product: ManyToMany<typeof Product>
}

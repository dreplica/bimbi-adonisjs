import {
  BaseModel,
  column,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
  belongsTo,
  BelongsTo,
} from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'
import ProductCategory from './ProductCategory'

export default class ProductSubCategory extends BaseModel {
  public static table = 'product_sub_categories'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column({ columnName: 'product_category_id' })
  public product_category_id: number

  @column()
  public status: boolean

  @belongsTo(() => ProductCategory, {
    foreignKey: 'product_category_id',
    localKey: 'id',
  })
  public productcategory: BelongsTo<typeof ProductCategory>

  // @manyToMany(()=>Product)
  // public product: ManyToMany<typeof Product>
}

import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import auth from './auth'
import ProductCategory from './ProductCategory'
import ProductSubCategory from './ProductSubCategory'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public product_category_id: number

  @column()
  public product_sub_category_id: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public price: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

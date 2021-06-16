import { DateTime } from 'luxon'
import {
  column,
  BaseModel,
} from '@ioc:Adonis/Lucid/Orm'

export default class token extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public admin: number

  @column()
  public email: string

  @column()
  public type?: string

  @column()
  public token?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public expires_at: DateTime


}

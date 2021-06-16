import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE')
      table
        .integer('product_category_id')
        .unsigned()
        .references('product_category.id')
        .onDelete('CASCADE')
      table
        .integer('product_sub_category_id')
        .unsigned()
        .references('product_sub_categories.id')
        .onDelete('CASCADE')
      table.string('title').notNullable()
      table.string('description').notNullable()
      table.integer('price').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

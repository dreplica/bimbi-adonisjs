import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ProductSubCategories extends BaseSchema {
  protected tableName = 'product_sub_categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name').unique().notNullable()
      table.integer('product_category_id').unsigned().references('product_category.id').onDelete("CASCADE")
      table.boolean('status')
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

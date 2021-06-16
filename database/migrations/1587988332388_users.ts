import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AuthsSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('username').notNullable()
      table.string('email').unique().notNullable()
      table.string('password').notNullable()
      table.string('remember_me_token').nullable()
      table.enum('type', ['admin', 'user']).notNullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('gender').notNullable()
      table.string('contact_number').notNullable()
      table.string('address').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}

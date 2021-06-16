/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('login',"AuthenticatesController.index")
Route.post('signup',"AuthenticatesController.signup")

Route.group(()=>{
  Route.get('/', 'ProductsController.index')
  Route.get('/one', 'ProductsController.getOneProduct')
  Route.post('/', 'ProductsController.postProduct')
  Route.put('/', 'ProductsController.updateProduct')
  Route.delete('/', 'ProductsController.deleteProduct')
}).prefix('/product').middleware("auth")

Route.group(()=>{
  Route.post('/', 'CategoriesController.categories')
  Route.post('/subcategories', 'CategoriesController.subCategories')
}).prefix('/categories').middleware("auth")

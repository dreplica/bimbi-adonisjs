import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CheckAuth {
  public async handle(
    { request: req, response: res }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = req.headers().authorization?.split(' ')[1]
    console.log('the user', req.headers().cookie)
    if (!user) {
      res.unauthorized({ error: "can't access resources" })
    }
    await next()
  }
}

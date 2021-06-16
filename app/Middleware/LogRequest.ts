import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'

export default class LogRequest {
  public async handle(
    { request, response: _response }: HttpContextContract,
    next: () => Promise<void>
  ) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    console.log(request.method(), ' : ', request.url())
    console.log(Env.get('ENV_PATH'))

    await next()
  }
}

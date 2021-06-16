// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContext } from '@adonisjs/http-server/build/standalone'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Hash from '@ioc:Adonis/Core/Hash'
import User from 'App/Models/auth'
import { validateRegistration } from 'App/helpers/authvalidator'
import token from 'App/Models/token'

export default class AuthenticatesController {
  public async index({auth,request,  response}: HttpContext &  HttpContextContract) {
    try {
      const user_email = request.input('email')
      const password = request.input('password')
      const user = await User.query().where('email', user_email).firstOrFail()

      if (!(await Hash.verify(user.password.trim(), password.trim()))) {
        return response.badRequest('Invalid credentials')
      }

      const token = await auth.use('api').generate(<token>(user as unknown), {
        email: user_email,
        admin: user.type === "admin"?1:0
      })
      return token
    } catch (error) {
      response.unauthorized({message: "invalid credentials"})

    }
  }

  public async signup({ auth, request, response, ...rest }: HttpContext &  HttpContextContract) {
    try {
      const userDetails = await request.validate({
        schema: validateRegistration,
      })
      let user = new User()
      user = Object.assign(user, userDetails)
      await user.save()
      request.input = (arg) => {
        return { email: user.email, password: userDetails.password }[arg]
      };

      return this.index({
        auth: auth as typeof auth,
        request: request as typeof request,
        response: response as typeof response,
        ...rest
      })
    } catch (error) {
      response.unauthorized({message : "sorry try again", error})
    }
  }
}

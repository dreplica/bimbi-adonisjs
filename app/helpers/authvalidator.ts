import { schema, rules } from '@ioc:Adonis/Core/Validator'

export const validateRegistration = schema.create({
  username: schema.string({ trim: true }, [rules.required()]),
  email: schema.string({ trim: true }, [
    rules.email(),
    rules.required()
  ]),
  password: schema.string({ trim: true }),
  type: schema.string({ trim: true }, [rules.required()]),
  first_name: schema.string({ trim: true }, [rules.required()]),
  last_name: schema.string({ trim: true }, [rules.required()]),
  gender: schema.string({ trim: true }, [rules.required()]),
  contact_number: schema.string({ trim: true }, [rules.required()]),
  address: schema.string({ trim: true }, [rules.required()]),
})

export const validateCat = schema.create({
  name: schema.string({ trim: true }, [rules.required()]),
  status: schema.boolean([rules.required()]),
})

export const validateSubCat = schema.create({
  name: schema.string({ trim: true }, [rules.required()]),
  product_category_id: schema.number([rules.required()]),
  status: schema.boolean([rules.required()]),
})

export const validateCreate = schema.create({
  user_id:schema.number([rules.required()]),
  product_category_id:schema.number([rules.required()]),
  product_sub_category_id:schema.number([rules.required()]),
  title : schema.string({trim:true},[rules.required()]),
  description:schema.string({trim:true},[rules.required()]),
  price: schema.number([rules.required()]),
})

export const validatePut = schema.create({
  user_id:schema.number.optional(),
  product_category_id:schema.number.optional(),
  product_sub_category_id:schema.number.optional(),
  title : schema.string.optional({trim:true}),
  description:schema.string.optional({trim:true}),
  price: schema.number.optional(),
})



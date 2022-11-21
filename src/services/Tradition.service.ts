import Tradition from '../models/Tradition'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'
import * as Joi from 'joi'
import { statSchema } from '../util/validations'
import BadRequestError from '../errors/BadRequestError'

export type TraditionRepository = CrudRepository<Tradition>
export default {
  async repository(): Promise<TraditionRepository> {
    return await createCrudRepository<Tradition>('traditions', { uniqueFields: ['name'] })
  },

  async validate(body: Tradition): Promise<Tradition> {
    const schema = Joi.object({
      name: Joi.string(),
      keyAbility: statSchema,
      drawbacks: Joi.object(),
      boons: Joi.object(),
    })

    try {
      await schema.validateAsync(body)

      return body
    } catch (err) {
      throw new BadRequestError(err.message)
    }
  }
}


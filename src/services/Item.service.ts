import BadRequestError from '../errors/BadRequestError'
import Item from '../models/Item'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'
import * as Joi from 'joi'

export type ItemRepository = CrudRepository<Item>
export default {
  async repository(): Promise<ItemRepository> {
    return await createCrudRepository<Item>('items', { uniqueFields: ['name'] })
  },

  async validate(body: Item): Promise<Item> {
    const schema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      amount: Joi.number().min(0).required(),
      consumable: Joi.bool().required(),
      equipable: Joi.bool().required(),
    })

    try {
      await schema.validateAsync(body)

      return body
    } catch (err) {
      throw new BadRequestError(err.message)
    }
  }
}


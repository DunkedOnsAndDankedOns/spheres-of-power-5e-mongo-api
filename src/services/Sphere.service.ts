import Sphere from '../models/Sphere'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'
import * as Joi from 'joi'
import { statSchema } from '../util/validations'
import BadRequestError from '../errors/BadRequestError'

export type SphereRepository = CrudRepository<Sphere>
export default {
  async repository(): Promise<SphereRepository> {
    return await createCrudRepository<Sphere>('spheres', { uniqueFields: ['name'] })
  },

  async validate(body: Sphere): Promise<Sphere> {
    const talentSchema = Joi.object({
      name: Joi.string().required(),
      cost: Joi.number().min(0).required(),
      description: Joi.string().required(),
      prerequisites: Joi.string(),
    })

    const abilitySchema = Joi.object({
      castingTime: Joi.string().required(),
      range: Joi.string().required(),
      duration: Joi.string().required(),
      description: Joi.string().required(),
      target: Joi.string(),
      area: Joi.string(),
      savingThrow: statSchema.allow('varies'),
      cost: Joi.alt([
        Joi.number().min(0),
        Joi.array().items(Joi.number().min(0))
      ]).required(),
    })

    const sphereSchema = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      talents: Joi.array().items(Joi.object({ 
        name: Joi.string().required(), 
        intro: Joi.string(),
        talents: Joi.array().items(talentSchema).required()
      }).required()).required(),
      abilities: Joi.array().items(abilitySchema).required()
    })

    try {
      await sphereSchema.validateAsync(body)

      return body
    } catch (err) {
      throw new BadRequestError(err.message)
    }
  }
}


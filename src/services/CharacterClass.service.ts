import CharacterClass, { Feature } from '../models/CharacterClass'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'
import * as Joi from 'joi'
import BadRequestError from '../errors/BadRequestError'
import { dieSchema, statSchema } from '../util/validations'

export type CharacterClassRepository = CrudRepository<CharacterClass>
export default {
  async repository(): Promise<CharacterClassRepository> {
    return await createCrudRepository<CharacterClass>('classes', { uniqueFields: ['name'] })
  },

  async validate(body: CharacterClass): Promise<CharacterClass> {
    const featureSchema = Joi.object({
      name: Joi.string().required(),
      level: dieSchema.required(),
      description: Joi.string().required(),
    })

    const schema = Joi.object({
      name: Joi.string().min(1).required(),
      hitDie: dieSchema.required(),

      savingThrows: Joi.array().items(Joi.array().items(statSchema).required()).required(),

      features: Joi.array().items(featureSchema).required(),
      specializations: Joi.object<Record<string, Feature[]>>().required(),
      
      magicTalents: Joi.object({
        1: Joi.number().min(0).required(),
        2: Joi.number().min(0).required(),
        3: Joi.number().min(0).required(),
        4: Joi.number().min(0).required(),
        5: Joi.number().min(0).required(),
        6: Joi.number().min(0).required(),
        7: Joi.number().min(0).required(),
        8: Joi.number().min(0).required(),
        9: Joi.number().min(0).required(),
        10: Joi.number().min(0).required(),
        11: Joi.number().min(0).required(),
        12: Joi.number().min(0).required(),
        13: Joi.number().min(0).required(),
        14: Joi.number().min(0).required(),
        15: Joi.number().min(0).required(),
        16: Joi.number().min(0).required(),
        17: Joi.number().min(0).required(),
        18: Joi.number().min(0).required(),
        19: Joi.number().min(0).required(),
        20: Joi.number().min(0).required(),
      }).required(),
      spellPoints: Joi.object({
        1: Joi.number().min(0).required(),
        2: Joi.number().min(0).required(),
        3: Joi.number().min(0).required(),
        4: Joi.number().min(0).required(),
        5: Joi.number().min(0).required(),
        6: Joi.number().min(0).required(),
        7: Joi.number().min(0).required(),
        8: Joi.number().min(0).required(),
        9: Joi.number().min(0).required(),
        10: Joi.number().min(0).required(),
        11: Joi.number().min(0).required(),
        12: Joi.number().min(0).required(),
        13: Joi.number().min(0).required(),
        14: Joi.number().min(0).required(),
        15: Joi.number().min(0).required(),
        16: Joi.number().min(0).required(),
        17: Joi.number().min(0).required(),
        18: Joi.number().min(0).required(),
        19: Joi.number().min(0).required(),
        20: Joi.number().min(0).required(),
      }).required(),
      classAbilityDie: Joi.object({
        1: dieSchema.required(),
        2: dieSchema.required(),
        3: dieSchema.required(),
        4: dieSchema.required(),
        5: dieSchema.required(),
        6: dieSchema.required(),
        7: dieSchema.required(),
        8: dieSchema.required(),
        9: dieSchema.required(),
        10: dieSchema.required(),
        11: dieSchema.required(),
        12: dieSchema.required(),
        13: dieSchema.required(),
        14: dieSchema.required(),
        15: dieSchema.required(),
        16: dieSchema.required(),
        17: dieSchema.required(),
        18: dieSchema.required(),
        19: dieSchema.required(),
        20: dieSchema.required(),
      }),
    })

    try {
      await schema.validateAsync(body)

      return body
    } catch (err) {
      throw new BadRequestError(err.message)
    }
  }
}


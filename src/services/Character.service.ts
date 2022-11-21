import { ObjectId } from 'mongodb'
import Character from '../models/Character'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'
import CharacterClassService from './CharacterClass.service'
import * as Joi from 'joi'
import BadRequestError from '../errors/BadRequestError'

export type CharacterRepository = CrudRepository<Character>
export default {
  async repository(): Promise<CharacterRepository> {
    return await createCrudRepository<Character>('characters', {
      associations: [
        {
          localField: 'traditionId',
          foreginCollection: 'traditions',
          foreginField: '_id',
          association: 'ManyToOne',
        },
        {
          localField: 'inventoryItemIds',
          foreginCollection: 'items',
          foreginField: '_id',
          association: 'ManyToMany',
        },
        {
          localField: 'sphereIds',
          foreginCollection: 'spheres',
          foreginField: '_id',
          association: 'ManyToMany',
        },
        {
          localField: 'classIds',
          foreginCollection: 'classes',
          foreginField: '_id',
          association: 'ManyToMany',
        },
      ]
    })
  },

  async validate(body: Character): Promise<Character> {
    const schema = Joi.object({
      name: Joi.string().required(),
      armorClass: Joi.number().min(0).required(),
      stats: Joi.object<Stats>({
        Strength: Joi.object({ score: Joi.number().min(0).max(20), modifier: Joi.number() }).required(),
        Dexterity: Joi.object({ score: Joi.number().min(0).max(20), modifier: Joi.number() }).required(),
        Constitution: Joi.object({ score: Joi.number().min(0).max(20), modifier: Joi.number() }).required(),
        Wisdom: Joi.object({ score: Joi.number().min(0).max(20), modifier: Joi.number() }).required(),
        Intelligence: Joi.object({ score: Joi.number().min(0).max(20), modifier: Joi.number() }).required(),
        Charisma: Joi.object({ score: Joi.number().min(0).max(20), modifier: Joi.number() }).required(),
      }).required(),
      traditionId: Joi.string().required(),
      speed: Joi.object({
        Walk: Joi.number().required(),
        Burrow: Joi.number(),
        Swim: Joi.number(),
        Fly: Joi.number(),
      }).required(),
      race: Joi.string().required(),
      background: Joi.string().required(),
      languages: Joi.array<Language>().required(),
      currency: Joi.object({
        cp: Joi.number().min(0),
        sp: Joi.number().min(0),
        ep: Joi.number().min(0),
        gp: Joi.number().min(0),
        pp: Joi.number().min(0),
      }).required(),
      inventoryItemIds: Joi.array().items(Joi.string()).required(),
      hitPoints: Joi.object({
        current: Joi.number().min(0).required(),
        temporary: Joi.number().min(0).required(),
        rolled: Joi.number().min(0).required(),
        max: Joi.number().min(0).required(),
      }).required(),
      hitDiceCurrent: Joi.object().required(),
      spellPool: Joi.object({
        current: Joi.number().min(0).required(),
        max: Joi.number().min(0).required(),
      }).required(),
      levels: Joi.object<Record<string, Level>>().required(),
      classIds: Joi.array().items(Joi.string().required()).required(),
      sphereIds: Joi.array().items(Joi.string()).required(),
      alignment: Joi.string(),
      backstory: Joi.string(),
      allies: Joi.object<Record<string, string>>(),
      enemies: Joi.object<Record<string, string>>(),
      notes: Joi.string(),
      deathSaves: Joi.object({
        success: Joi.number().min(0).max(3),
        fail: Joi.number().min(0).max(3),
      }),
    })

    try {
      await schema.validateAsync(body)

      for (const classId of body.classIds) {
        if (body.levels[classId] === undefined) {
          throw new Error('class id not in levels')
        }
      }

      for (const classId in body.levels) {
        if (!body.classIds.find((id) => id === classId)) {
          throw new Error('class defined in levels not part of classes')
        }
      }

      return body
    } catch (err) {
      throw new BadRequestError(err.message)
    }
  },

  async modelInput(body: Character): Promise<Character> {
    await setModifiers(body)
    await setHitPoints(body)
    await setHitDiceCurrent(body)
    // TODO: set spell pool

    return body
  }
}

const setModifiers = async (body: Character) => {
  const { stats } = body
  const scoreToModifier = (score: number) => Math.floor((score - 10) / 2)

  stats.Strength.modifier = scoreToModifier(stats.Strength.score)
  stats.Dexterity.modifier = scoreToModifier(stats.Dexterity.score)
  stats.Constitution.modifier = scoreToModifier(stats.Constitution.score)
  stats.Wisdom.modifier = scoreToModifier(stats.Wisdom.score)
  stats.Intelligence.modifier = scoreToModifier(stats.Intelligence.score)
  stats.Charisma.modifier = scoreToModifier(stats.Charisma.score)
}

const setHitPoints = async (body: Character) => {
  const { hitPoints, stats } = body
  const totalLevel = getTotalLevel(body)
  hitPoints.max = hitPoints.rolled + (stats.Constitution.modifier * totalLevel)
  hitPoints.current = hitPoints.max
}

const setHitDiceCurrent = async (body: Character) => {
  const { hitDiceCurrent, levels } = body

  const repo = await CharacterClassService.repository()

  for (const [ classId, level ] of Object.entries(levels)) {
    const characterClass = await repo.find({ _id: new ObjectId(classId) })
    if (!hitDiceCurrent[characterClass.hitDie]) {
      hitDiceCurrent[characterClass.hitDie] = 0
    }
    hitDiceCurrent[characterClass.hitDie] += level
  }
}

const getTotalLevel = (body: Character) => {
  const { levels } = body
  let totalLevel = 0
  for (const level in levels) {
    totalLevel += Number.parseInt(level)
  }
  return totalLevel
}

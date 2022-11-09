import Die from '../models/Die'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'

export default {
  async repository(): Promise<CrudRepository<Die>> {
    return await createCrudRepository<Die>('dice', { uniqueFields: ['sides'] })
  },

  roll(die: Die) {
    return 1 + Math.floor(Math.random() * die.sides)
  }
}

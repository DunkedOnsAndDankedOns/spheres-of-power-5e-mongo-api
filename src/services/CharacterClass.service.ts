import CharacterClass from '../models/CharacterClass'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'

export type CharacterClassRepository = CrudRepository<CharacterClass>
export default {
  async repository(): Promise<CharacterClassRepository> {
    return await createCrudRepository<CharacterClass>('classes', { uniqueFields: ['name'] })
  },
}


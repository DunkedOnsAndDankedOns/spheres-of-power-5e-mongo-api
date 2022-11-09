import Character from '../models/Character'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'

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
      ]
    })
  },
}


import Tradition from '../models/Tradition'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'

export type TraditionRepository = CrudRepository<Tradition>
export default {
  async repository(): Promise<TraditionRepository> {
    return await createCrudRepository<Tradition>('traditions', { uniqueFields: ['name'] })
  },
}


import Item from '../models/Item'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'

export type ItemRepository = CrudRepository<Item>
export default {
  async repository(): Promise<ItemRepository> {
    return await createCrudRepository<Item>('items', { uniqueFields: ['name'] })
  },
}


import Sphere from '../models/Sphere'
import { CrudRepository } from '../types/CrudRepository'
import { createCrudRepository } from '../util/repository'

export type SphereRepository = CrudRepository<Sphere>
export default {
  async repository(): Promise<SphereRepository> {
    return await createCrudRepository<Sphere>('spheres', { uniqueFields: ['name'] })
  },
}


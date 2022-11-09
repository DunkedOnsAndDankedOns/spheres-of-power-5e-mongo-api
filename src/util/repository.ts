import { Document, Filter, ObjectId } from 'mongodb'

import { getCollection } from '../MongoConfig'

export async function createCrudRepository<T>(name: string, options?: {
  uniqueFields: string[]
}) {
  const collection = await getCollection(name)

  if (options) {
    for (const field of options.uniqueFields) {
      collection.createIndex({ [field]: 1 } , { unique: true })
    }
  }

  return {
    async create(obj: T) {
      const result = await collection.insertOne(obj)
      return result.insertedId
    },

    async remove(id: string) {
      const result = await collection.deleteOne({
        $where: new ObjectId(id)
      })
      return result.deletedCount
    },

    async update(id: string, obj: T) {
      const result = await collection.updateOne({
        _id: id
      }, {
        $set: obj
      })
      return result.modifiedCount
    },

    async find(query: Filter<Document & T>) { 
      return await collection.findOne(query)
    },
    async findAll(query: Filter<Document & T>) { 
      return await collection.find(query).toArray()
    },
  }
}

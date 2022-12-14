import { Document, Filter, ObjectId, WithId } from 'mongodb'
import { CrudRepository } from '../types/CrudRepository'

import { getCollection } from '../util/mongo'

type association = {
  foreginCollection: string
  foreginField: string
  localField: string
  association: 'OneToMany' | 'OneToOne' | 'ManyToOne' | 'ManyToMany'
}

export async function createCrudRepository<T>(name: string, options?: {
  uniqueFields?: string[]
  associations?: association[]
}): Promise<CrudRepository<T>> {
  const collection = await getCollection(name)

  if (options && options.uniqueFields) {
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
        _id: new ObjectId(id),
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

    async find(query: Filter<Document>): Promise<WithId<T>> { 
      const original = await collection.findOne(query) as WithId<T>
      if (!options?.associations) {
        return original
      }

      return applyAssociations(original, options.associations)
    },
    async findAll(query: Filter<Document>): Promise<WithId<T>[]> { 
      const originals = await collection.find(query).toArray() as WithId<T>[]
      if (!options?.associations) {
        return originals
      }

      return await Promise.all(originals.map(original => applyAssociations(original, options.associations)))
    },
  }
}

async function applyAssociations<T>(original: WithId<T>, associations: association[]): Promise<WithId<T>> {
  for (const association of associations) {
    const foreginCollection = await getCollection(association.foreginCollection)

    switch (association.association) {
      case 'OneToOne': {
        const localFieldName = association.localField.replace(/Id/i, '')
        original[localFieldName] = await foreginCollection.findOne({ [association.foreginField]: original._id })
        break
      }
      case 'OneToMany': {
        const localFieldName = association.localField.replace(/Ids/i, '')
        const ids = original[association.localField]
        original[localFieldName] = await foreginCollection.find({ [association.foreginField]: { $in: ids } }).toArray()
        break
      }
      case 'ManyToOne': {
        const localFieldName = association.localField.replace(/Id/i, '')
        const id = new ObjectId(original[association.localField])
        const match = await foreginCollection.findOne({ [association.foreginField]: id })
        original[localFieldName] = match
        break
      }
      case 'ManyToMany': {
        const localFieldName = association.localField.replace(/Ids/i, '')
        original[localFieldName] = await foreginCollection.find({ [association.foreginField]: { $in: original[association.localField] } }).toArray()
        break
      }
    }
  }
  return original
}

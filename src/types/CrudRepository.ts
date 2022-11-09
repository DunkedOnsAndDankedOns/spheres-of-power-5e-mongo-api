import { Filter, Document, ObjectId, WithId } from 'mongodb'

export type CrudRepository<T> = {
  create(obj: T): Promise<ObjectId>

  remove(id: string): Promise<number>

  update(id: string, obj: T): Promise<number>

  find(query: Filter<Document & T>): Promise<WithId<Document>>
  findAll(query?: Filter<Document & T>): Promise<WithId<Document>[]>
}

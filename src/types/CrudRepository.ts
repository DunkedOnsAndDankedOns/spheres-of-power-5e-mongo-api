import { Filter, Document, ObjectId } from 'mongodb'

export type CrudRepository<T> = {
  create(obj: T): Promise<ObjectId>

  remove(id: string): Promise<number>

  update(id: string, obj: T): Promise<number>

  find(query: Filter<Document>): Promise<Document>
  findAll(query?: Filter<Document>): Promise<Document[]>
}

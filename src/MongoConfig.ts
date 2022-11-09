import { MongoClient } from 'mongodb'

const { MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env

const connectionString = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}`
export const client = new MongoClient(connectionString)

export async function connect() {
  const connection = await client.connect()
  return connection.db(MONGO_DB)
}

export async function getCollection(collection: string) {
  const db = await connect()
  return db.collection(collection)
}

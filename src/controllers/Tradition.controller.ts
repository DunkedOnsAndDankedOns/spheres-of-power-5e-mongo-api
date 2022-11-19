import { RequestHandler } from 'express'
import { ObjectId } from 'mongodb'
import NotFoundError from '../errors/InternalServerError'
import InternalServerError from '../errors/InternalServerError'
import TraditionService, { TraditionRepository } from '../services/Tradition.service'

let repository: TraditionRepository
const getRepo = async () => {
  if (repository) { return repository }
  repository = await TraditionService.repository()
  return repository
}

export const findAll: RequestHandler = async (req, res, next) => {
  try {
    const repo = await getRepo()

    const result = await repo.findAll()
   
    res.json({ result })
  } catch (e) {
    next(e)
  }
}


export const find: RequestHandler = async (req, res, next) => {
  try {
    const repo = await getRepo()
    const { id } = req.params

    const result = await repo.find({ _id: new ObjectId(id) })
   
    res.json({ result })
  } catch (e) {
    next(e)
  }
}

export const create: RequestHandler = async (req, res, next) => {
  try {
    const repo = await getRepo()

    const result = await repo.create(req.body)
   
    if (!result) {
      throw new InternalServerError('failed to create')
    }

    res.json({ result })
  } catch (e) {
    next(e)
  }
}


export const remove: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const repo = await getRepo()

    const result = await repo.remove(req.params.id)
   
    if (!result) {
      throw new NotFoundError('id not found')
    }

    res.json({ result })
  } catch (e) {
    next(e)
  }
}

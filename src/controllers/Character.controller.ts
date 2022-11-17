import { RequestHandler } from 'express'
import NotFoundError from '../errors/InternalServerError'
import InternalServerError from '../errors/InternalServerError'
import CharacterService, { CharacterRepository } from '../services/Character.service'

let repository: CharacterRepository
const getRepo = async () => {
  if (repository) { return repository }
  repository = await CharacterService.repository()
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


export const find: RequestHandler<{ id: string }> = async (req, res, next) => {
  try {
    const repo = await getRepo()
    const { id } = req.params

    const result = await repo.find({ _id: id })
   
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
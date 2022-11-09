import { RequestHandler } from 'express'
import NotFoundError from '../errors/InternalServerError'
import InternalServerError from '../errors/InternalServerError'
import CharacterClassService, { CharacterClassRepository } from '../services/CharacterClass.service'

let repository: CharacterClassRepository
const getRepo = async () => {
  if (repository) { return repository }
  repository = await CharacterClassService.repository()
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
    const { name } = req.query

    const result = await repo.find({ name: name })
   
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

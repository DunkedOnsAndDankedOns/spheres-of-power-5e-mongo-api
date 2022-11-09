import { RequestHandler } from "express"
import InternalServerError from "../errors/InternalServerError"
import TraditionService, { TraditionRepository } from "../services/Tradition.service"

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


export const find: RequestHandler<{ name: string }> = async (req, res, next) => {
  try {
    const repo = await getRepo()
    const { name } = req.params

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
      throw new InternalServerError('failed to create die')
    }

    res.json({ result })
  } catch (e) {
    next(e)
  }
}


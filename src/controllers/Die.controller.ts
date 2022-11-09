import { RequestHandler } from 'express'
import InternalServerError from '../errors/InternalServerError'
import DieService from '../services/Die.service'

// let repository: DieRepository
// const getRepo = async () => {
//   if (repository) { return repository }
//   repository = await DieService.repository()
//   return repository
// }
//
// export const find: RequestHandler<{ sides: string }> = async (req, res, next) => {
//   try {
//     const repo = await getRepo()
//     const { sides } = req.params
//
//     const result = await repo.findBySides(Number.parseInt(sides))
//    
//     res.json({ result })
//   } catch (e) {
//     next(e)
//   }
// }
//
// export const create: RequestHandler = async (req, res, next) => {
//   try {
//     const repo = await getRepo()
//
//     const result = await repo.create(req.body)
//    
//     if (!result) {
//       throw new InternalServerError('failed to create die')
//     }
//
//     res.json({ result })
//   } catch (e) {
//     next(e)
//   }
// }
//
export const roll: RequestHandler<{ sides: string }> = async (req, res, next) => {
  try {
    const result = DieService.roll({ sides: Number.parseInt(req.params.sides) })
    
    if (!result) {
      throw new InternalServerError('failed to roll die')
    }

    res.json({ result })
  } catch (e) {
    next(e)
  }
}

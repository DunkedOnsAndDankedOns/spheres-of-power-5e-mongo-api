import { RequestHandler } from 'express'
import InternalServerError from '../errors/InternalServerError'
import DieService from '../services/Die.service'

export const roll: RequestHandler<{ sides: string }> = async (req, res, next) => {
  try {
    const result = DieService.roll(Number.parseInt(req.params.sides))
    
    if (!result) {
      throw new InternalServerError('failed to roll die')
    }

    res.json({ result })
  } catch (e) {
    next(e)
  }
}

import { Router } from 'express'
import * as controller from '../controllers/Die.controller'

const router = Router()

router.get('/roll/:sides', controller.roll)

export default router

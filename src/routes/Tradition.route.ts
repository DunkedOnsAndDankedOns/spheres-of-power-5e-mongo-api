import { Router } from 'express'
import * as controller from '../controllers/Tradition.controller'

const router = Router()

router.get('/:name', controller.find)
router.get('/', controller.findAll)

router.post('/', controller.create)

export default router

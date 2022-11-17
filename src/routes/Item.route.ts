import { Router } from 'express'
import * as controller from '../controllers/Item.controller'

const router = Router()

router.get('/:name', controller.find)
router.get('/', controller.findAll)

router.post('/', controller.create)
router.delete('/:id', controller.remove)

export default router
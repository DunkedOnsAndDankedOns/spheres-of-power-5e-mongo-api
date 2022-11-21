import { Router } from 'express'
import * as controller from '../controllers/Character.controller'

const router = Router()

router.get('/:id', controller.find)
router.get('/', controller.findAll)

router.post('/', controller.create)
router.patch('/:id', controller.update)
router.delete('/:id', controller.remove)

export default router

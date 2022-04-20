import { Router } from 'express'
import ScheduleController from '../controllers/ScheduleController.js'

const scheduleController = new ScheduleController()

const router = Router()

router.post('/schedule', scheduleController.store.bind(scheduleController))
router.get('/schedule/:id', scheduleController.getOne.bind(scheduleController))
router.get('/schedule/date/:date', scheduleController.getSchedules.bind(scheduleController)) // returns schedules sorted by date and time
router.get('/schedule', scheduleController.index.bind(scheduleController)) // returns all schedules
router.put('/schedule/:id', scheduleController.update.bind(scheduleController))
router.delete('/schedule/:id', scheduleController.remove.bind(scheduleController)) // delete schedule by Id
router.delete('/schedule', scheduleController.removeAll.bind(scheduleController)) // delete all schedules

export default router

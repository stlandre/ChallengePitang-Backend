import Joi from 'joi'
import Storage from '../../storage/Storage.js'
import dotenv from 'dotenv'

dotenv.config()

const vacancesPerDay = process.env.vacancesPerDay
const schedulesPerHour = process.env.schedulesPerHour

class ScheduleController {
  constructor () {
    this.storage = new Storage()
  }

  schemaAndValidation (request) {
    const schema = Joi.object({
      name: Joi.string().required(),
      birthDate: Joi.date().iso(),
      dateTime: Joi.date().iso().required(),
      finished: Joi.boolean()
    })

    return schema.validate(request.body)
  }

  store (request, response) {
    const schemaValidation = this.schemaAndValidation(request)

    if (schemaValidation.error) {
      return response.status(400).send(
        {
          error: schemaValidation.error.details.map(({ message }) => message),
          message: 'Invalid data'
        })
    }

    const { name, birthDate, dateTime, finished } = request.body
    const schedule = {
      name,
      birthDate,
      dateTime,
      finished
    }

    // check quantity of schedules per day and hour
    if (isNaN(Date.parse(dateTime))) {
      return response.status(400).send({ message: 'Invalid date' })
    } else {
      const dateT = new Date(dateTime)
      const schedulesOnDay = this.storage.getSchedulesDay(dateT).length
      if (schedulesOnDay >= vacancesPerDay) {
        return response.status(404).send({ message: 'Not found vacancy for this day' })
      }

      const schedulesOnDayHour = this.storage.getSchedulesDayHour(dateT, dateT.getUTCHours()).length
      if (schedulesOnDayHour >= schedulesPerHour) {
        return response.status(404).send({ message: 'Not found vacancy for this time' })
      }
    }

    const schedulejson = JSON.parse(this.storage.setSchedule(schedule))
    response.send({ message: 'Schedule created', schedulejson })
  }

  getOne (request, response) {
    const { id } = request.params
    const schedule = this.storage.getScheduleById(id)

    if (!schedule) {
      return response.status(404).send({ message: 'Schedule not found' })
    }

    return response.status(200).send(schedule)
  }

  getSchedules (request, response) {
    const { date } = request.params
    const dateISO = new Date(date)
    if (isNaN(Date.parse(date))) {
      return response.status(400).send({ message: 'Invalid date' })
    } else {
      const schedules = this.storage.getSchedulesDay(dateISO)

      if (schedules.length === 0) {
        return response.status(404).send({ message: 'Not found schedules on this day' })
      }

      response.status(200).send(schedules)
    }
  }

  index (request, response) {
    const schedules = this.storage.getAll()

    if (schedules.length === 0) {
      return response.status(404).send({ message: 'Not found schedules' })
    }

    response.status(200).send(schedules)
  }

  update (request, response) {
    const { id } = request.params
    const schemaValidation = this.schemaAndValidation(request)

    if (schemaValidation.error) {
      return response.status(400).send(
        {
          error: schemaValidation.error.details.map(({ message }) => message),
          message: 'Invalid data'
        })
    }

    const { name, birthDate, dateTime, finished } = request.body
    const schedule = {
      name,
      birthDate,
      dateTime,
      finished
    }

    const scheduleOnStorage = JSON.parse(this.storage.getScheduleById(id))

    // check quantity of schedules per day and hour if dateTime is different
    if (isNaN(Date.parse(dateTime))) {
      return response.status(400).send({ message: 'Invalid date' })
    } else {
      if (schedule.dateTime !== scheduleOnStorage.dateTime) {
        const dateT = new Date(dateTime)
        const schedulesOnDay = this.storage.getSchedulesDay(dateT).length
        if (schedulesOnDay >= vacancesPerDay) {
          return response.status(404).send({ message: 'Not found vacancy for this day' })
        }

        const schedulesOnDayHour = this.storage.getSchedulesDayHour(dateT, dateT.getUTCHours()).length
        if (schedulesOnDayHour >= schedulesPerHour) {
          return response.status(404).send({ message: 'Not found vacancy for this time' })
        }
      }
    }

    const scheduleUpdated = this.storage.updateScheduleById(id, schedule)
    if (!scheduleUpdated) {
      return response.status(404).send({ message: 'Schedule not found' })
    }

    const scheduleUpdatedjson = JSON.parse(scheduleUpdated)
    response.send({ message: 'Schedule updated', scheduleUpdatedjson })
  }

  remove (request, response) {
    const { id } = request.params
    const scheduleRemoved = this.storage.removeById(id)

    if (!scheduleRemoved) {
      return response.status(404).send({ message: 'Schedule not found' })
    }

    const scheduleRemovedjson = JSON.parse(scheduleRemoved)
    response.send({ message: 'Schedule removed', scheduleRemovedjson })
  }

  removeAll (request, response) {
    this.storage.removeAll()

    response.status(200).send({ message: 'Schedules removed' })
  }
}

export default ScheduleController

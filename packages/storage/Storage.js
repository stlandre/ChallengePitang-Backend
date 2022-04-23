import { LocalStorage } from 'node-localstorage'

function compareDates (schedule1, schedule2) {
  return schedule1.dateTime.getTime() - schedule2.dateTime.getTime()
}

class Storage {
  constructor () {
    this.localStorage = new LocalStorage('./scratch')
    if (this.localStorage.length === 0) {
      this.localStorage.setItem('0', '1')
    }
    this.idGenerate = Number(this.localStorage.getItem('0'))
  }

  setSchedule (schedule) {
    this.localStorage.setItem('0', `${this.idGenerate + 1}`)
    schedule.id = this.idGenerate // obviously this idGenerate is illustrative
    const scheduleString = JSON.stringify(schedule)
    this.localStorage.setItem(`${this.idGenerate}`, scheduleString)
    this.idGenerate++

    return this.localStorage.getItem(`${this.idGenerate - 1}`)
  }

  getSchedulesDay (date) {
    const querySchedules = []
    const dateD = new Date(date)

    for (let i = 1; i < this.localStorage.length; i++) {
      const key = this.localStorage.key(i)
      const dateUTC = new Date(JSON.parse(this.localStorage.getItem(key)).dateTime)

      if (dateD.getUTCDate() === dateUTC.getUTCDate() && dateD.getUTCMonth() === dateUTC.getUTCMonth() && dateD.getUTCFullYear() === dateUTC.getUTCFullYear()) { // dayString === dayS) {
        const scheduleStringJson = JSON.parse(this.localStorage.getItem(key))
        const scheduleJson = {
          id: scheduleStringJson.id,
          name: scheduleStringJson.name,
          birthDate: new Date(scheduleStringJson.birthDate),
          dateTime: new Date(scheduleStringJson.dateTime),
          finished: scheduleStringJson.finished
        }

        querySchedules.push(scheduleJson)
      }
    }

    querySchedules.sort(compareDates)

    return querySchedules
  }

  getSchedulesDayHour (date, hourUTC) {
    const querySchedules = []
    const schedules = this.getSchedulesDay(date)

    // console.log(hourUTC)

    for (let i = 0; i < schedules.length; i++) {
      if (schedules[i].dateTime.getUTCHours() === hourUTC) {
        querySchedules.push(schedules[i])
      }
    }

    return querySchedules
  }

  getScheduleById (id) {
    if (id !== '0') {
      return this.localStorage.getItem(`${id}`)
    }

    return null
  }

  updateScheduleById (id, schedule) {
    if (id !== '0' && this.getScheduleById(id)) {
      schedule.id = Number(id)
      const scheduleString = JSON.stringify(schedule)
      this.localStorage.setItem(`${id}`, scheduleString)

      return this.localStorage.getItem(`${id}`)
    }

    return null
  }

  getAll () {
    const querySchedules = []
    // const dayString = date.toDateString()

    for (let i = 1; i < this.localStorage.length; i++) {
      const key = this.localStorage.key(i)

      const scheduleStringJson = JSON.parse(this.localStorage.getItem(key))

      const scheduleJson = {
        id: scheduleStringJson.id,
        name: scheduleStringJson.name,
        birthDate: new Date(scheduleStringJson.birthDate),
        dateTime: new Date(scheduleStringJson.dateTime),
        finished: scheduleStringJson.finished
      }

      querySchedules.push(scheduleJson)
    }

    querySchedules.sort(compareDates)

    return querySchedules
  }

  removeById (id) {
    if (id !== '0' && this.getScheduleById(id)) {
      const schedule = this.localStorage.getItem(`${id}`)
      this.localStorage.removeItem(`${id}`)

      return schedule
    }

    return null
  }

  removeAll () {
    this.localStorage.clear()
  }
}

export default Storage

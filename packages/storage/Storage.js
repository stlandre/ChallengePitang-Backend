import { LocalStorage } from 'node-localstorage'

function compareDates (schedule1, schedule2) {
  return schedule1.dateTime.getTime() - schedule2.dateTime.getTime()
}

class Storage {
  constructor () {
    this.localStorage = new LocalStorage('./scratch')
    this.idGenerate = 1
  }

  setSchedule (schedule) {
    schedule.id = this.idGenerate
    const scheduleString = JSON.stringify(schedule)
    this.localStorage.setItem(`${this.idGenerate}`, scheduleString)
    this.idGenerate++
  }

  getSchedulesDay (date) {
    const querySchedules = []
    const dayString = date.toDateString()
    for (let i = 0; i < this.localStorage.length; i++) {
      const key = this.localStorage.key(i)
      const dateTemp = new Date(JSON.parse(this.localStorage.getItem(key)).dateTime)
      const dayS = dateTemp.toDateString()

      if (dayString === dayS) {
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

  removeAll () {
    this.localStorage.clear()
  }
}

export default Storage

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import Storage from '../storage/Storage.js'

dotenv.config()

const app = express()

// const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

// app.get('/', function (req, res) {
//   res.send('hello world')
// })

// app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`)
// })

const storage = new Storage()

const schedule = { name: 'Andre', dateTime: new Date(2022, 3, 19, 0, 0, 0, 5), finished: true }
const schedule2 = { name: 'Bruna', dateTime: new Date(2022, 3, 19, 0, 0, 0, 1), finished: true }
// console.log(schedule.date.toDateString())
// console.log(schedule.date.toTimeString())
// console.log(schedule)

storage.setSchedule(schedule)
storage.setSchedule(schedule2)
// console.log(storage.localStorage.array)
// console.log(JSON.parse(storage.localStorage.getItem('1')))
// console.log(new Date(JSON.parse(storage.localStorage.getItem('1')).date))
console.log(storage.getSchedulesDay(new Date(2022, 3, 19, 0, 0, 0, 0)))

storage.removeAll()
console.log(storage.getSchedulesDay(new Date()).length)

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import router from './routes/ScheduleRouter.js'
// import Storage from '../storage/Storage.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3333

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/api', router)

app.get('/', function (req, res) {
  res.send('hello world')
})

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})

import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { LocalStorage } from 'node-localstorage'

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

const localStorage = new LocalStorage('./scratch')

localStorage.setItem('myFirstKey', 'myFirstValue')
localStorage.setItem('mySecondKey', 'mySecondValue')
// localStorage.removeItem('myFirstKey')
// localStorage.removeItem('mySecondKey')
localStorage.clear()
console.log(localStorage.length)
console.log(localStorage.getItem('mySecondKey'))

import 'dotenv'
import express from 'express'
import initDB from './db/index.js'

const app = express()

const database = await initDB()

app.use(express.json())

const { errorHandler } = await import('./middlewares/errorHandler.js')
app.use(errorHandler)

const PORT = process.env.PORT || 5050
app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
})

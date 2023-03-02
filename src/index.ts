import 'dotenv'
import express from 'express'
import { ControllerOptions } from './controllers/controller'

import initDB from './db/index.js'
import initControllers from './controllers/index.js'
import initRouters, { ApiOptions } from './routes/index.js'

// init app
const app = express()
app.use(express.json())

// db
const database = await initDB()

// controllers
const controllersOptions: ControllerOptions = { models: database.models }
const controllers = await initControllers(controllersOptions)

// api
const apiOptions: ApiOptions = {
	controllers: controllers,
	middlewares: []
}
app.use(initRouters(apiOptions))

const { errorHandler } = await import('./middlewares/errorHandler.js')
app.use(errorHandler)

const PORT = process.env.PORT || '5050'
app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
})

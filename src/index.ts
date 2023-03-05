import 'dotenv'
import express from 'express'
import { ControllerOptions } from './controllers/controller'

import initDB from './db/index.js'
import initControllers from './controllers/index.js'
import initRouters, { ApiOptions } from './routes/index.js'

import errorHandler from './middlewares/errorHandler.js'

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
	controllers: controllers
}
app.use('/api', initRouters(apiOptions))
app.use(errorHandler)

// start
const PORT = process.env.APP_PORT || '5050'
app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
})

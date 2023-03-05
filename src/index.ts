import 'dotenv'
import express from 'express'

import initDB from './db/index.js'
import initControllers from './controllers/index.js'
import initRouters from './routes/index.js'

import errorHandler from './middlewares/errorHandler.js'

// init app
const app = express()
app.use(express.json())

// db
const models = await initDB()

// controllers
const controllers = await initControllers(models)

// api
app.use('/api', initRouters(controllers))
app.use(errorHandler)

// start
const PORT = process.env.APP_PORT || '5050'
app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
})

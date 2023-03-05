import 'dotenv'
import express from 'express'
import bcrypt from 'bcrypt'

import initDB from './db/index.js'
import initControllers from './controllers/index.js'
import initRouters from './routes/index.js'

import errorHandler from './middlewares/errorHandler.js'

// init app
const app = express()
app.use(express.json())

// db
const models = await initDB()

// create admin user
try {
	if (!(await models.User.count())) {
		const login = process.env.ADMIN_NAME || 'admin'
		const password = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin', 5)

		await models.User.create({ login, password })
	}
} catch (e) {
	console.log(`Error create admin user: `, e)
	throw e
}

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

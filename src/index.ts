import 'dotenv'
import express from 'express'

const app = express()
const PORT = process.env.PORT || 5050

async function appInit() {
	app.use(express.json())

	// const routes = require("./routes/index");
	// app.use("/api", routes);


	const { errorHandler } = await import('./middlewares/errorHandler.js')
	app.use(errorHandler)
}

async function dbInit() {
	try {
		// const sequelize = require("./db/index");
		// require("./db/models/usersModels");
		// await sequelize.sync();
	} catch (err) {
		console.log(err)
		throw err
	}
}

await dbInit()
await appInit()

app.listen(PORT, () => {
	console.log(`Server has been started on port ${PORT}`)
})

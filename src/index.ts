require('dotenv')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 5050

function appInit() {
	app.use(express.json())

	// const routes = require("./routes/index");
	// app.use("/api", routes);

	const errorHandler = require('./middlewares/errorHandler')
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

;(async () => {
	await dbInit()
	appInit()

	app.listen(PORT, () => {
		console.log(`Server has been started on port ${PORT}`)
	})
})()

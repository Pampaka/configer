import Controller, { ControllerOptions } from '../controller.js'
import { NextFunction, Request, Response } from 'express'
import { ConfigModel } from '../../db/models/config'
import { badRequest } from '../../error/apiError.js'

class ConfigController extends Controller {
	protected configModel: typeof ConfigModel

	constructor(options: ControllerOptions) {
		super(options)
		this.configModel = this.models.Config
	}

	async getByName(
		req: Request<{ name: string }, {}, {}, { env: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { name } = req.params
			const { env } = req.query

			if (env === undefined) return next(badRequest('Parameter "env" required'))

			const configData = await this.configModel.findOne({
				where: { name, env }
			})

			res.json(configData)
		} catch (e: unknown) {
			console.warn('Error getting config: ', e)
			next(e)
		}
	}

	async create(
		req: Request<{}, {}, { env: string; name: string; data: string }, {}>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { name, env, data } = req.body

			if (env === undefined) return next(badRequest('Parameter "env" required'))
			if (name === undefined) return next(badRequest('Parameter "name" required'))
			if (data !== undefined) {
				try {
					JSON.parse(data)
				} catch (e) {
					return next(badRequest('Error parsing json "data"'))
				}
			}

			const checkConfig = await this.configModel.findOne({
				where: { name, env }
			})
			if (!!checkConfig) return next(badRequest('"Name" and "env" binding must be unique'))

			const newConfig = await this.configModel.create({ name, env, data })

			res.json(newConfig)
		} catch (e: unknown) {
			console.warn('Error creating config: ', e)
			next(e)
		}
	}
}

export default ConfigController

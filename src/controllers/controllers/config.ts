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

			const checkConfig = await this.configModel.findOne({
				where: { name, env }
			})
			if (!!checkConfig) return next(badRequest(`Config "${name}:${env}" already exists`))

			const newConfig = await this.configModel.create({ name, env, data })

			res.json(newConfig)
		} catch (e: unknown) {
			console.warn('Error creating config: ', e)
			next(e)
		}
	}

	async update(
		req: Request<{}, {}, { env: string; name: string; data: string }, {}>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { name, env, data } = req.body

			const checkConfig = await this.configModel.findOne({
				where: { name, env }
			})
			if (!checkConfig) return next(badRequest(`Config "${name}:${env}" does not exist`))

			const newConfig = await this.configModel.update(
				{ data },
				{
					where: { name, env },
					returning: true
				}
			)

			res.json(newConfig[1][0])
		} catch (e: unknown) {
			console.warn('Error creating config: ', e)
			next(e)
		}
	}
}

export default ConfigController

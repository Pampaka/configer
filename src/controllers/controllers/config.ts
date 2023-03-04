import Controller, { ControllerOptions } from '../controller.js'
import { NextFunction, Request, Response } from 'express'
import { Config } from '../../db/models/config'
import { badRequest } from '../../error/apiError.js'

class ConfigController extends Controller {
	protected configModel: typeof Config

	constructor(options: ControllerOptions) {
		super(options)
		this.configModel = this.models.Config
	}

	async getByName(
		req: Request<{ name: string }, {}, {}, { env: string | undefined }>,
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
			console.warn('Error get config: ', e)
			next(e)
		}
	}
}

export default ConfigController

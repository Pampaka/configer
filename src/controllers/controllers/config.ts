import Controller, { ControllerOptions } from '../controller.js'
import { NextFunction, Request, Response } from 'express'
import { Config } from '../../db/models/config'

class ConfigController extends Controller {
	protected configModel: typeof Config

	constructor(options: ControllerOptions) {
		super(options)
		this.configModel = this.models.Config
	}

	async getByName(
		req: Request<{ configName: string }>,
		res: Response,
		next: NextFunction
	) {
		try {
			const { configName } = req.params

			const configData = await this.configModel.findOne({
				where: { name: configName }
			})

			res.json(configData)
		} catch (e: unknown) {
			console.warn('Error get config: ', e)
			next(e)
		}
	}
}

export default ConfigController

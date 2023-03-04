import {
	Model,
	DataTypes,
	Sequelize,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional
} from 'sequelize'
import { randomUUID } from 'crypto'

export class Config extends Model<
	InferAttributes<Config>,
	InferCreationAttributes<Config>
> {
	declare id: CreationOptional<number>
	declare name: string
	declare env: string
	declare data: CreationOptional<string | null>
}

export default function (sequelize: Sequelize): typeof Config {
	Config.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: randomUUID(),
				unique: true
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true
			},
			env: {
				type: DataTypes.STRING,
				allowNull: false,
				primaryKey: true
			},
			data: { type: DataTypes.JSON }
		},
		{
			sequelize,
			tableName: 'configs'
		}
	)

	return Config
}

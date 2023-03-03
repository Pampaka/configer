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
	declare id: number
	declare name: string
	declare data: CreationOptional<string | null>
	declare createdAt: CreationOptional<Date>
	declare updatedAt: CreationOptional<Date>
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
				primaryKey: true,
				unique: true
			},
			data: { type: DataTypes.JSON },
			createdAt: DataTypes.DATE,
			updatedAt: DataTypes.DATE
		},
		{
			sequelize,
			tableName: 'configs'
		}
	)

	return Config
}

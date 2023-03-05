import {
	Model,
	DataTypes,
	Sequelize,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional
} from 'sequelize'

export class ConfigModel extends Model<
	InferAttributes<ConfigModel>,
	InferCreationAttributes<ConfigModel>
> {
	declare name: string
	declare env: string
	declare data: CreationOptional<string | null>
}

export default function (sequelize: Sequelize): typeof ConfigModel {
	ConfigModel.init(
		{
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

	return ConfigModel
}

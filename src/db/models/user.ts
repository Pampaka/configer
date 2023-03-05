import {
	Model,
	DataTypes,
	Sequelize,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional
} from 'sequelize'

export class UserModel extends Model<
	InferAttributes<UserModel>,
	InferCreationAttributes<UserModel>
> {
	declare id: CreationOptional<string>
	declare login: string
	declare password: CreationOptional<string>
}

export default function (sequelize: Sequelize): typeof UserModel {
	UserModel.init(
		{
			id: {
				type: DataTypes.UUID,
				primaryKey: true,
				allowNull: false,
				defaultValue: DataTypes.UUIDV4
			},
			login: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true
			},
			password: {
				type: DataTypes.STRING
			}
		},
		{
			sequelize,
			tableName: 'users'
		}
	)

	return UserModel
}

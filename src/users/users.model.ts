import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface UserCreationAttributes {
	login: string
	password: string
}

@Table({ tableName: 'users' })
export class UserModel extends Model<UserModel, UserCreationAttributes> {
	@Column({
		type: DataType.UUID,
		defaultValue: DataType.UUIDV4,
		allowNull: false,
		primaryKey: true
	})
	id: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	login: string

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	password: string
}

import { Column, DataType, Model, Table } from 'sequelize-typescript'

interface ConfigCreationAttributes {
	name: string
	env: string
	data: object
}

@Table({ tableName: 'configs' })
export class ConfigModel extends Model<ConfigModel, ConfigCreationAttributes> {
	@Column({
		type: DataType.UUID,
		allowNull: false,
		primaryKey: true,
		defaultValue: DataType.UUIDV4
	})
	id: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		primaryKey: true
	})
	name: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		primaryKey: true
	})
	env: string

	@Column({ type: DataType.JSON })
	data: object
}

import { DataTypes, Sequelize } from 'sequelize'
import { randomUUID } from 'crypto'

export default function (sequelize: Sequelize) {
	const Config = sequelize.define(`config`, {
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
		data: { type: DataTypes.JSONB }
	})

	return { Config }
}

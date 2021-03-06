import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../database'

class Personal extends Model< InferAttributes<Personal>, InferCreationAttributes<Personal>> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password: string
  declare score: number | null
}

Personal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false
    },
    email: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    tableName: 'personal',
    timestamps: false,
    sequelize // passing the `sequelize` instance is required
  }
)

export default Personal

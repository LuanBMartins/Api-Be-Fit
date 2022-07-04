import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin } from 'sequelize'
import sequelize from '../database'

class DataStudent extends Model< InferAttributes<DataStudent>, InferCreationAttributes<DataStudent>> {
  declare id: CreationOptional<number>
  declare weight: number
  declare height: number
  declare arms: number
  declare legs: number
  declare waist: number
  declare chest: number
  declare gymStudentId: number
}

DataStudent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    weight: {
      type: DataTypes.FLOAT(),
      defaultValue: 0,
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    arms: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    legs: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    waist: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    chest: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
      allowNull: false
    },
    gymStudentId: {
      type: DataTypes.INTEGER,
      references: { model: 'gymStudent', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    }
  },
  {
    tableName: 'dataStudent',
    timestamps: false,
    sequelize // passing the `sequelize` instance is required
  }
)

DataStudent.sync()

export default DataStudent

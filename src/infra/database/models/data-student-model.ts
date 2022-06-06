import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin } from 'sequelize'
import sequelize from '../database'
import GymStudent from './gym-student-model'

class dataStudent extends Model< InferAttributes<dataStudent>, InferCreationAttributes<dataStudent>> {
  declare id: CreationOptional<number>
  declare weight: number
  declare height: number
  declare arms: number
  declare legs: number
  declare waist: number
  declare chest: number
  declare GymStudentId: HasManyAddAssociationMixin<GymStudent, number>
}

dataStudent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    weight: {
      type: new DataTypes.FLOAT(),
      allowNull: true
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    arms: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    legs: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    waist: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    chest: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  },
  {
    tableName: 'dataStudent',
    timestamps: false,
    sequelize // passing the `sequelize` instance is required
  }
)

GymStudent.hasOne(dataStudent)

dataStudent.belongsTo(GymStudent)

dataStudent.sync()

export default dataStudent

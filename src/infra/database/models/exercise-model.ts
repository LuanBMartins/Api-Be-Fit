import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin } from 'sequelize'
import sequelize from '../database'

class Exercise extends Model< InferAttributes<Exercise>, InferCreationAttributes<Exercise>> {
  declare id: CreationOptional<number>
  declare workoutId: number
  declare exerciseName: string
  declare serie: number
  declare repetition: number
}

Exercise.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    workoutId: {
      type: DataTypes.INTEGER,
      references: { model: 'workout', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    },
    exerciseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    serie: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    repetition: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    tableName: 'Exercise',
    timestamps: false,
    sequelize // passing the `sequelize` instance is required
  }
)

export default Exercise

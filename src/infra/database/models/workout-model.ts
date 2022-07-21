import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../database'

class Workout extends Model< InferAttributes<Workout>, InferCreationAttributes<Workout>> {
  declare id: CreationOptional<number>
  declare day: string
  declare category: string
  declare PersonalId: number
  declare gymStudentId: number
}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    day: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    PersonalId: {
      type: DataTypes.INTEGER,
      references: { model: 'personal', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
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
    tableName: 'workout',
    timestamps: false,
    sequelize // passing the `sequelize` instance is required
  }
)

export default Workout

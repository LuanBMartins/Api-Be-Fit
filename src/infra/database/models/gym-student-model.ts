import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin } from 'sequelize'
import sequelize from '../database'
import Personal from './personal-model'

class gymStudent extends Model< InferAttributes<gymStudent>, InferCreationAttributes<gymStudent>> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password: string
  declare goals: string
  declare PersonalId: HasManyAddAssociationMixin<Personal, number>
}

gymStudent.init(
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
    goals: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  },
  {
    tableName: 'gymStudent',
    timestamps: false,
    sequelize // passing the `sequelize` instance is required
  }
)

Personal.hasMany(gymStudent)

gymStudent.belongsTo(Personal)

gymStudent.sync()

export default gymStudent

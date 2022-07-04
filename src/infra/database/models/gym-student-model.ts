import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, HasManyAddAssociationMixin } from 'sequelize'
import sequelize from '../database'

class gymStudent extends Model< InferAttributes<gymStudent>, InferCreationAttributes<gymStudent>> {
  declare id: CreationOptional<number>
  declare name: string
  declare email: string
  declare password: string
  declare confirmed: boolean
  declare goals: string
  declare PersonalId: number
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
      allowNull: true
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    goals: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    PersonalId: {
      type: DataTypes.INTEGER,
      references: { model: 'personal', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: true
    }
  },
  {
    tableName: 'gymStudent',
    timestamps: false,
    sequelize // passing the `sequelize` instance is required
  }
)

gymStudent.sync()

export default gymStudent

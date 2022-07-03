import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '../database'

class Video extends Model< InferAttributes<Video>, InferCreationAttributes<Video>> {
  declare id: CreationOptional<number>
  declare name: string
  declare category: string
  declare url: string
  declare score: number | null
  declare PersonalId: number
}

Video.init(
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
    category: {
      type: DataTypes.CHAR(100),
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    PersonalId: {
      type: DataTypes.INTEGER,
      references: { model: 'personal', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
      allowNull: false
    }
  },
  {
    tableName: 'video',
    timestamps: false,
    sequelize // passing the `sequelize` instance is required
  }
)

Video.sync()

export default Video

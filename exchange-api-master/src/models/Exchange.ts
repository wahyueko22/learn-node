import { Model, DataTypes, NOW } from 'sequelize';
import sequelize from '../utils/sequelizeConfig';

interface ExchangeAttributes {
  id?: number;
  userId: number;
  base: string;
  originalValue: number;
  exchangeCoin: string;
  exchangedValue: number;
  rate: number;
  date?: Date;
}

class Exchange extends Model<ExchangeAttributes> implements ExchangeAttributes {
  public id!: number;
  public userId!: number;
  public base!: string;
  public originalValue!: number;
  public exchangeCoin!: string;
  public exchangedValue!: number;
  public rate!: number;
  public date!: Date;
}

Exchange.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  base: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  originalValue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  exchangeCoin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  exchangedValue: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  rate: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  date: {
    type: DataTypes.NOW,
    defaultValue: NOW(),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Exchange',
  timestamps: false,
});

export default Exchange;

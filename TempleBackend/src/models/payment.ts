import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Payment as PaymentInterface } from '../types/payment';

class Payment extends Model<PaymentInterface> implements PaymentInterface {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public status!: 'pending' | 'completed' | 'failed';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'failed'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payment',
  }
);

export default Payment;
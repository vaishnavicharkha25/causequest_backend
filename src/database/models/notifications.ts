import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { UserMaster } from './user_master';

interface NotificationAttributes {
  NotificationId: number;
  UserId: number;
  Message: string;
  IsRead: boolean;
  CreatedOn: Date;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'NotificationId' | 'IsRead'> {}

export class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  declare NotificationId: number;
  declare UserId: number;
  declare Message: string;
  declare IsRead: boolean;
  declare CreatedOn: Date;

  static associate() {
    Notification.belongsTo(UserMaster, { foreignKey: 'UserId', as: 'User' });
  }
}

export function initNotification(sequelize: Sequelize) {
  Notification.init({
    NotificationId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    IsRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    }
  }, {
    sequelize,
    tableName: 'notifications',
    timestamps: false,
  });

  return Notification;
}

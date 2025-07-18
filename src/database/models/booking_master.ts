import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { StudentMaster } from './student_master';
import { NgoMaster } from './ngo_master';

interface BookingAttributes {
  BookingId: number;
  StudentId: number;
  NgoId: number;
  Date: Date;
  Time: string;
  Duration: number;
  Message?: string | null;
  Status: string;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: Date;
  ModifiedBy?: number | null;
  ModifiedOn?: Date | null;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'BookingId' | 'Message' | 'ModifiedBy' | 'ModifiedOn'> {}

export class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
  declare BookingId: number;
  declare StudentId: number;
  declare NgoId: number;
  declare Date: Date;
  declare Time: string;
  declare Duration: number;
  declare Message?: string | null;
  declare Status: string;
  declare IsActive: boolean;
  declare CreatedBy: number;
  declare CreatedOn: Date;
  declare ModifiedBy?: number | null;
  declare ModifiedOn?: Date | null;

  static associate() {
    Booking.belongsTo(StudentMaster, { foreignKey: 'StudentId', as: 'Student' });
    Booking.belongsTo(NgoMaster, { foreignKey: 'NgoId', as: 'Ngo' });
  }
}

export function initBooking(sequelize: Sequelize) {
  Booking.init({
    BookingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    NgoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    Duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Message: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    IsActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    CreatedOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    ModifiedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ModifiedOn: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  }, {
    sequelize,
    tableName: 'booking',
    timestamps: false,
  });

  return Booking;
}

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequilize';
import { NgoMaster } from './ngo_master';
import { ServiceMaster } from './service_master';
import { StudentMaster } from './student_master';

interface VolunteerSlotAttributes {
  VolunteerSlotId: number;
  NgoId: number;
  ServiceId: number;
  DateTime: Date;
  IsBooked: boolean;
  StudentId?: number | null;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: Date;
  ModifiedBy?: number | null;
  ModifiedOn?: Date | null;
}

interface VolunteerSlotCreationAttributes
  extends Optional<VolunteerSlotAttributes, 'VolunteerSlotId' | 'StudentId' | 'ModifiedBy' | 'ModifiedOn'> {}

export class VolunteerSlot
  extends Model<VolunteerSlotAttributes, VolunteerSlotCreationAttributes>
  implements VolunteerSlotAttributes {
  declare VolunteerSlotId: number;
  declare NgoId: number;
  declare ServiceId: number;
  declare DateTime: Date;
  declare IsBooked: boolean;
  declare StudentId?: number | null;
  declare IsActive: boolean;
  declare CreatedBy: number;
  declare CreatedOn: Date;
  declare ModifiedBy?: number | null;
  declare ModifiedOn?: Date | null;

  static associate() {
    VolunteerSlot.belongsTo(NgoMaster, { foreignKey: 'NgoId', as: 'Ngo' });
    VolunteerSlot.belongsTo(ServiceMaster, { foreignKey: 'ServiceId', as: 'Service' });
    VolunteerSlot.belongsTo(StudentMaster, { foreignKey: 'StudentId', as: 'Student' });
  }
}

VolunteerSlot.init(
  {
    VolunteerSlotId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NgoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ServiceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    DateTime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    IsBooked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    StudentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    },
  },
  {
    sequelize,
    tableName: 'volunteer_slots',
    timestamps: false,
  }
);

export default{ VolunteerSlot };

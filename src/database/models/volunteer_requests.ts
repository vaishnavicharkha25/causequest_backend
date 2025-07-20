import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequilize'; // Make sure this path is correct
import { NgoMaster } from './ngo_master';

interface VolunteerRequestAttributes {
  RequestId: number;
  NgoId: number;
  Title: string;
  Description?: string | null;
  Requirements?: string[] | null;
  TimePreferences?: string[] | null;
  VolunteersNeeded: number;
  Urgency: string;
  Deadline?: Date | null;
  Location?: string | null;
  Type: string;
  Status: string;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: Date;
  ModifiedBy?: number | null;
  ModifiedOn?: Date | null;
}

interface VolunteerRequestCreationAttributes
  extends Optional<
    VolunteerRequestAttributes,
    'RequestId' | 'Description' | 'Requirements' | 'TimePreferences' | 'Deadline' | 'Location' | 'ModifiedBy' | 'ModifiedOn'
  > {}

export class VolunteerRequest
  extends Model<VolunteerRequestAttributes, VolunteerRequestCreationAttributes>
  implements VolunteerRequestAttributes {
  declare RequestId: number;
  declare NgoId: number;
  declare Title: string;
  declare Description?: string | null;
  declare Requirements?: string[] | null;
  declare TimePreferences?: string[] | null;
  declare VolunteersNeeded: number;
  declare Urgency: string;
  declare Deadline?: Date | null;
  declare Location?: string | null;
  declare Type: string;
  declare Status: string;
  declare IsActive: boolean;
  declare CreatedBy: number;
  declare CreatedOn: Date;
  declare ModifiedBy?: number | null;
  declare ModifiedOn?: Date | null;

  static associate() {
    VolunteerRequest.belongsTo(NgoMaster, { foreignKey: 'NgoId', as: 'Ngo' });
  }
}

// ✅ Initialize the model immediately
VolunteerRequest.init(
  {
    RequestId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    NgoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Requirements: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    TimePreferences: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    VolunteersNeeded: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Urgency: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    Deadline: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Type: {
      type: DataTypes.STRING(50),
      allowNull: false,
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
    },
  },
  {
    sequelize,
    tableName: 'volunteer_requests',
    timestamps: false,
  }
);

export default { VolunteerRequest };

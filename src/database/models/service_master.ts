import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequilize'; // Adjust path as needed
import { NgoMaster } from './ngo_master';

interface ServiceMasterAttributes {
  ServiceId: number;
  NgoId: number;
  Title: string;
  Category: string;
  Description?: string | null;
  AvailableSlots?: number | null;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: Date;
  ModifiedBy?: number | null;
  ModifiedOn?: Date | null;
}

interface ServiceMasterCreationAttributes extends Optional<ServiceMasterAttributes, 'ServiceId' | 'Description' | 'AvailableSlots' | 'ModifiedBy' | 'ModifiedOn'> {}

export class ServiceMaster extends Model<ServiceMasterAttributes, ServiceMasterCreationAttributes> implements ServiceMasterAttributes {
  declare ServiceId: number;
  declare NgoId: number;
  declare Title: string;
  declare Category: string;
  declare Description?: string | null;
  declare AvailableSlots?: number | null;
  declare IsActive: boolean;
  declare CreatedBy: number;
  declare CreatedOn: Date;
  declare ModifiedBy?: number | null;
  declare ModifiedOn?: Date | null;

  static associate() {
    ServiceMaster.belongsTo(NgoMaster, { foreignKey: 'NgoId', as: 'Ngo' });
  }
}

ServiceMaster.init({
  ServiceId: {
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
  Category: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  AvailableSlots: {
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
  }
}, {
  sequelize,
  tableName: 'services',
  timestamps: false,
});

export default { ServiceMaster };

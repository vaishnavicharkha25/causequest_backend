import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { UserMaster } from './user_master';

interface NgoMasterAttributes {
  NgoId: number;
  UserId: number;
  Name: string;
  Description?: string | null;
  ImageUrl?: string | null;
  Location?: string | null;
  Category?: string | null;
  Requirements?: string[] | null;
  TimePreferences?: string[] | null;
  Availability?: string | null;
  Rating?: number | null;
  VolunteersNeeded?: number | null;
  ContactEmail?: string | null;
  Website?: string | null;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: Date;
  ModifiedBy?: number | null;
  ModifiedOn?: Date | null;
}

interface NgoMasterCreationAttributes extends Optional<NgoMasterAttributes, 'NgoId' | 'Description' | 'ImageUrl' | 'Location' | 'Category' | 'Requirements' | 'TimePreferences' | 'Availability' | 'Rating' | 'VolunteersNeeded' | 'ContactEmail' | 'Website' | 'ModifiedBy' | 'ModifiedOn'> {}

export class NgoMaster extends Model<NgoMasterAttributes, NgoMasterCreationAttributes> implements NgoMasterAttributes {
  declare NgoId: number;
  declare UserId: number;
  declare Name: string;
  declare Description?: string | null;
  declare ImageUrl?: string | null;
  declare Location?: string | null;
  declare Category?: string | null;
  declare Requirements?: string[] | null;
  declare TimePreferences?: string[] | null;
  declare Availability?: string | null;
  declare Rating?: number | null;
  declare VolunteersNeeded?: number | null;
  declare ContactEmail?: string | null;
  declare Website?: string | null;
  declare IsActive: boolean;
  declare CreatedBy: number;
  declare CreatedOn: Date;
  declare ModifiedBy?: number | null;
  declare ModifiedOn?: Date | null;

  static associate() {
    NgoMaster.belongsTo(UserMaster, { foreignKey: 'UserId', as: 'User' });
  }
}

export function initNgoMaster(sequelize: Sequelize) {
  NgoMaster.init({
    NgoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ImageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Category: {
      type: DataTypes.STRING(255),
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
    Availability: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Rating: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    VolunteersNeeded: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ContactEmail: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Website: {
      type: DataTypes.STRING(255),
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
    tableName: 'ngo_master',
    timestamps: false,
  });

  return NgoMaster;
}

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequilize';
import { RoleMaster } from './role_master';
interface UserMasterAttributes {
  UserId: number;
  Name: string;
  Email: string;
  PasswordHash: string;
  RoleId: number;
  ProfileImage?: string | null;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: Date;
  ModifiedBy?: number | null;
  ModifiedOn?: Date | null;
}

interface UserMasterCreationAttributes
  extends Optional<UserMasterAttributes, 'UserId' | 'ProfileImage' | 'IsActive' | 'ModifiedBy' | 'ModifiedOn'> {}

export class UserMaster extends Model<UserMasterAttributes, UserMasterCreationAttributes>
  implements UserMasterAttributes {
  declare UserId: number;
  declare Name: string;
  declare Email: string;
  declare PasswordHash: string;
  declare RoleId: number;
  declare ProfileImage?: string | null;
  declare IsActive: boolean;
  declare CreatedBy: number;
  declare CreatedOn: Date;
  declare ModifiedBy?: number | null;
  declare ModifiedOn?: Date | null;

  static associate() {
    UserMaster.belongsTo(RoleMaster, { foreignKey: 'RoleId', as: 'Role' });
  }
}

// ✅ Init the model immediately
UserMaster.init({
  UserId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  PasswordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  RoleId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ProfileImage: {
    type: DataTypes.STRING(500),
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
}, {
  sequelize, // ✅ Injected from your connection
  tableName: 'user_master',
  timestamps: false,
});

// ✅ Export as named export to match your current imports
export  default { UserMaster };

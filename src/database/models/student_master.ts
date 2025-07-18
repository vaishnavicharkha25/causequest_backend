import { DataTypes, Model, Sequelize, Optional } from 'sequelize';
import { UserMaster } from './user_master';

interface StudentMasterAttributes {
  StudentId: number;
  UserId: number;
  FullName: string;
  Phone?: string | null;
  Location?: string | null;
  UserType?: string | null;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: Date;
  ModifiedBy?: number | null;
  ModifiedOn?: Date | null;
}

interface StudentMasterCreationAttributes extends Optional<StudentMasterAttributes, 'StudentId' | 'Phone' | 'Location' | 'UserType' | 'ModifiedBy' | 'ModifiedOn'> {}

export class StudentMaster extends Model<StudentMasterAttributes, StudentMasterCreationAttributes> implements StudentMasterAttributes {
  declare StudentId: number;
  declare UserId: number;
  declare FullName: string;
  declare Phone?: string | null;
  declare Location?: string | null;
  declare UserType?: string | null;
  declare IsActive: boolean;
  declare CreatedBy: number;
  declare CreatedOn: Date;
  declare ModifiedBy?: number | null;
  declare ModifiedOn?: Date | null;

  static associate() {
    StudentMaster.belongsTo(UserMaster, { foreignKey: 'UserId', as: 'User' });
  }
}

export function initStudentMaster(sequelize: Sequelize) {
  StudentMaster.init({
    StudentId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    FullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    Location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    UserType: {
      type: DataTypes.STRING(50),
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
    tableName: 'student_master',
    timestamps: false,
  });

  return StudentMaster;
}

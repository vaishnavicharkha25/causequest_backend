import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from 'sequelize';
import sequelize from '../config/sequilize';

class RoleMaster extends Model<InferAttributes<RoleMaster>, InferCreationAttributes<RoleMaster>> {
    declare RoleId: CreationOptional<number>;
    declare RoleName: string;
    declare IsActive: boolean;
}

RoleMaster.init(
    {
        RoleId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        RoleName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        IsActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'role_master',
        timestamps: false
    }
);

export default RoleMaster;

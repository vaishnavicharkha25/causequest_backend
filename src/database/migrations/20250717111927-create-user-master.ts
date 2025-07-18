'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.createTable(
                'user_master',
                {
                    UserId: {
                        type: DataTypes.INTEGER,
                        autoIncrement: true,
                        primaryKey: true,
                        allowNull: false
                    },
                    Name: {
                        type: DataTypes.STRING(255),
                        allowNull: false
                    },
                    Email: {
                        type: DataTypes.STRING(255),
                        allowNull: false,
                        unique: true
                    },
                    PasswordHash: {
                        type: DataTypes.STRING(255),
                        allowNull: false
                    },
                    RoleId: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    ProfileImage: {
                        type: DataTypes.STRING(500),
                        allowNull: true
                    },
                    IsActive: {
                        type: DataTypes.BOOLEAN,
                        defaultValue: true,
                        allowNull: false
                    },
                    CreatedBy: {
                        type: DataTypes.INTEGER,
                        allowNull: false
                    },
                    CreatedOn: {
                        type: DataTypes.DATE,
                        allowNull: false,
                        defaultValue: DataTypes.NOW
                    },
                    ModifiedBy: {
                        type: DataTypes.INTEGER,
                        allowNull: true
                    },
                    ModifiedOn: {
                        type: DataTypes.DATE,
                        allowNull: true
                    }
                },
                { transaction }
            );

            await queryInterface.addConstraint('user_master', {
                fields: ['RoleId'],
                type: 'foreign key',
                name: 'fk_user_rolemaster',
                references: {
                    table: 'role_master',
                    field: 'RoleId'
                },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
                transaction
            });

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface: QueryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.removeConstraint('user_master', 'fk_user_rolemaster', {
                transaction
            });
            await queryInterface.dropTable('user_master', { transaction });

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};

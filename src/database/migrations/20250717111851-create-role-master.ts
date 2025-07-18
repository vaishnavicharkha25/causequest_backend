'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable(
                'role_master',
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
                        defaultValue: true,
                        allowNull: false
                    }
                },
                { transaction }
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    },

    async down(queryInterface: QueryInterface) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.dropTable('role_master', { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};

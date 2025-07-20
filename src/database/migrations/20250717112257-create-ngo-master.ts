'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    async up(queryInterface: QueryInterface) {
        const t = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.createTable(
                'ngo_master',
                {
                    NgoId: {
                        type: DataTypes.INTEGER,
                        primaryKey: true,
                        autoIncrement: true,
                        allowNull: false
                    },
                    UserId: { type: DataTypes.INTEGER, allowNull: false },
                    Name: { type: DataTypes.STRING(255), allowNull: false },
                    Description: { type: DataTypes.TEXT, allowNull: true },
                    ImageUrl: { type: DataTypes.STRING(500), allowNull: true },
                    Location: { type: DataTypes.STRING(255), allowNull: true },
                    Category: { type: DataTypes.STRING(255), allowNull: true },
                    Requirements: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
                    TimePreferences: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
                    Availability: { type: DataTypes.STRING(255), allowNull: true },
                    Rating: { type: DataTypes.FLOAT, allowNull: true },
                    VolunteersNeeded: { type: DataTypes.INTEGER, allowNull: true },
                    ContactEmail: { type: DataTypes.STRING(255), allowNull: true },
                    PhoneNumber: { type: DataTypes.STRING(20), allowNull: true }, // <== Added field here
                    Website: { type: DataTypes.STRING(255), allowNull: true },
                    IsActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
                    CreatedBy: { type: DataTypes.INTEGER, allowNull: false },
                    CreatedOn: {
                        type: DataTypes.DATE,
                        defaultValue: DataTypes.NOW,
                        allowNull: false
                    },
                    ModifiedBy: { type: DataTypes.INTEGER, allowNull: true },
                    ModifiedOn: { type: DataTypes.DATE, allowNull: true }
                },
                { transaction: t }
            );

            await queryInterface.addConstraint('ngo_master', {
                fields: ['UserId'],
                type: 'foreign key',
                name: 'fk_ngo_user',
                references: { table: 'user_master', field: 'UserId' },
                onDelete: 'NO ACTION',
                onUpdate: 'NO ACTION',
                transaction: t
            });

            await t.commit();
        } catch (error) {
            await t.rollback();
            throw error;
        }
    },

    async down(queryInterface: QueryInterface) {
        const t = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.removeConstraint('ngo_master', 'fk_ngo_user', { transaction: t });
            await queryInterface.dropTable('ngo_master', { transaction: t });
            await t.commit();
        } catch (error) {
            await t.rollback();
            throw error;
        }
    }
};

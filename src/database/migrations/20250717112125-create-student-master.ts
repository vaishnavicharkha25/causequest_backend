'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
    async up(queryInterface: QueryInterface) {
        const transaction = await queryInterface.sequelize.transaction();

        try {
            await queryInterface.createTable('student_master', {
                StudentId: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                UserId: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                FullName: {
                    type: DataTypes.STRING(255),
                    allowNull: false
                },
                Phone: {
                    type: DataTypes.STRING(20)
                },
                Location: {
                    type: DataTypes.STRING(255)
                },
                UserType: {
                    type: DataTypes.STRING(50)
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
                    defaultValue: DataTypes.NOW,
                    allowNull: false
                },
                ModifiedBy: {
                    type: DataTypes.INTEGER
                },
                ModifiedOn: {
                    type: DataTypes.DATE
                }
            }, { transaction });

            await queryInterface.addConstraint('student_master', {
                fields: ['UserId'],
                type: 'foreign key',
                name: 'fk_student_user',
                references: {
                    table: 'user_master',
                    field: 'UserId'
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
            await queryInterface.removeConstraint('student_master', 'fk_student_user', { transaction });
            await queryInterface.dropTable('student_master', { transaction });
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
};

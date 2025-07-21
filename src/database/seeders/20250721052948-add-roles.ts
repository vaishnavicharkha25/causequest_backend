'use strict';

import { QueryInterface, Sequelize } from 'sequelize';
import General from '../../utils/general';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            // Insert NGO and Student roles into role_master
            await queryInterface.bulkInsert(
                'role_master', // Ensure this matches your actual table name
                [
                    {
                        RoleName: 'ngo',
                        IsActive: true,
                        CreatedBy: 1,
                        CreatedOn: General.getDate(),
                        ModifiedBy: null,
                        ModifiedOn: null
                    },
                    {
                        RoleName: 'student',
                        IsActive: true,
                        CreatedBy: 1,
                        CreatedOn: General.getDate(),
                        ModifiedBy: null,
                        ModifiedOn: null
                    }
                ],
                { transaction }
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Error during NGO/Student role seeding:', error);
            throw error;
        }
    },

    async down(queryInterface: QueryInterface, Sequelize: Sequelize) {
        const transaction = await queryInterface.sequelize.transaction();
        try {
            await queryInterface.bulkDelete(
                'role_master',
                {
                    RoleName: ['ngo', 'student']
                },
                { transaction }
            );

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error('Error during rollback of NGO/Student roles:', error);
            throw error;
        }
    }
};

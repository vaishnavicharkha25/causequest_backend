'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('volunteer_slot', {
        VolunteerSlotId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        NgoId: { type: DataTypes.INTEGER, allowNull: false },
        ServiceId: { type: DataTypes.INTEGER, allowNull: false },
        DateTime: { type: DataTypes.DATE, allowNull: false },
        IsBooked: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
        StudentId: { type: DataTypes.INTEGER, allowNull: true },
        IsActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
        CreatedBy: { type: DataTypes.INTEGER, allowNull: false },
        CreatedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
        ModifiedBy: { type: DataTypes.INTEGER, allowNull: true },
        ModifiedOn: { type: DataTypes.DATE, allowNull: true }
      }, { transaction: t });

      await Promise.all([
        queryInterface.addConstraint('volunteer_slot', {
          fields: ['NgoId'], type: 'foreign key', name: 'fk_slot_ngo',
          references: { table: 'ngo_master', field: 'NgoId' }, onDelete: 'CASCADE', onUpdate: 'CASCADE', transaction: t
        }),
        queryInterface.addConstraint('volunteer_slot', {
          fields: ['ServiceId'], type: 'foreign key', name: 'fk_slot_service',
          references: { table: 'service_master', field: 'ServiceId' }, onDelete: 'CASCADE', onUpdate: 'CASCADE', transaction: t
        }),
        queryInterface.addConstraint('volunteer_slot', {
          fields: ['StudentId'], type: 'foreign key', name: 'fk_slot_student',
          references: { table: 'student_master', field: 'StudentId' }, onDelete: 'SET NULL', onUpdate: 'CASCADE', transaction: t
        })
      ]);

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  },

  async down(queryInterface: QueryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeConstraint('volunteer_slot', 'fk_slot_ngo', { transaction: t });
      await queryInterface.removeConstraint('volunteer_slot', 'fk_slot_service', { transaction: t });
      await queryInterface.removeConstraint('volunteer_slot', 'fk_slot_student', { transaction: t });
      await queryInterface.dropTable('volunteer_slot', { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};

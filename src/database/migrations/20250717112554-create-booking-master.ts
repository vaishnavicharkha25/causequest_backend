'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('booking_master', {
        BookingId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        StudentId: { type: DataTypes.INTEGER, allowNull: false },
        NgoId: { type: DataTypes.INTEGER, allowNull: false },
        Date: { type: DataTypes.DATEONLY, allowNull: false },
        Time: { type: DataTypes.TIME, allowNull: false },
        Duration: { type: DataTypes.INTEGER, allowNull: false },
        Message: { type: DataTypes.TEXT, allowNull: true },
        Status: { type: DataTypes.STRING(50), allowNull: false },
        IsActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
        CreatedBy: { type: DataTypes.INTEGER, allowNull: false },
        CreatedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
        ModifiedBy: { type: DataTypes.INTEGER, allowNull: true },
        ModifiedOn: { type: DataTypes.DATE, allowNull: true }
      }, { transaction: t });

      await queryInterface.addConstraint('booking_master', {
        fields: ['StudentId'], type: 'foreign key', name: 'fk_booking_student',
        references: { table: 'student_master', field: 'StudentId' },
        onDelete: 'CASCADE', onUpdate: 'CASCADE', transaction: t
      });

      await queryInterface.addConstraint('booking_master', {
        fields: ['NgoId'], type: 'foreign key', name: 'fk_booking_ngo',
        references: { table: 'ngo_master', field: 'NgoId' },
        onDelete: 'CASCADE', onUpdate: 'CASCADE', transaction: t
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
      await queryInterface.removeConstraint('booking_master', 'fk_booking_student', { transaction: t });
      await queryInterface.removeConstraint('booking_master', 'fk_booking_ngo', { transaction: t });
      await queryInterface.dropTable('booking_master', { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};

'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('volunteer_request', {
        RequestId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        NgoId: { type: DataTypes.INTEGER, allowNull: false },
        Title: { type: DataTypes.STRING(255), allowNull: false },
        Description: { type: DataTypes.TEXT, allowNull: true },
        Requirements: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
        TimePreferences: { type: DataTypes.ARRAY(DataTypes.TEXT), allowNull: true },
        VolunteersNeeded: { type: DataTypes.INTEGER, allowNull: false },
        Urgency: { type: DataTypes.STRING(50), allowNull: false },
        Deadline: { type: DataTypes.DATEONLY, allowNull: true },
        Location: { type: DataTypes.STRING(255), allowNull: true },
        Type: { type: DataTypes.STRING(50), allowNull: false },
        Status: { type: DataTypes.STRING(50), allowNull: false },
        IsActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
        CreatedBy: { type: DataTypes.INTEGER, allowNull: false },
        CreatedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
        ModifiedBy: { type: DataTypes.INTEGER, allowNull: true },
        ModifiedOn: { type: DataTypes.DATE, allowNull: true }
      }, { transaction: t });

      await queryInterface.addConstraint('volunteer_request', {
        fields: ['NgoId'], type: 'foreign key', name: 'fk_request_ngo',
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
      await queryInterface.removeConstraint('volunteer_request', 'fk_request_ngo', { transaction: t });
      await queryInterface.dropTable('volunteer_request', { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};

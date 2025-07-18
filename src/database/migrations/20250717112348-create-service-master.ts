'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('service_master', {
        ServiceId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        NgoId: { type: DataTypes.INTEGER, allowNull: false },
        Title: { type: DataTypes.STRING(255), allowNull: false },
        Category: { type: DataTypes.STRING(255), allowNull: false },
        Description: { type: DataTypes.TEXT, allowNull: true },
        AvailableSlots: { type: DataTypes.INTEGER, allowNull: true },
        IsActive: { type: DataTypes.BOOLEAN, defaultValue: true, allowNull: false },
        CreatedBy: { type: DataTypes.INTEGER, allowNull: false },
        CreatedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false },
        ModifiedBy: { type: DataTypes.INTEGER, allowNull: true },
        ModifiedOn: { type: DataTypes.DATE, allowNull: true }
      }, { transaction: t });

      await queryInterface.addConstraint('service_master', {
        fields: ['NgoId'], type: 'foreign key', name: 'fk_service_ngo',
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
      await queryInterface.removeConstraint('service_master', 'fk_service_ngo', { transaction: t });
      await queryInterface.dropTable('service_master', { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};

'use strict';

import { QueryInterface, DataTypes } from 'sequelize';

module.exports = {
  async up(queryInterface: QueryInterface) {
    const t = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('notification_master', {
        NotificationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
        UserId: { type: DataTypes.INTEGER, allowNull: false },
        Message: { type: DataTypes.TEXT, allowNull: false },
        IsRead: { type: DataTypes.BOOLEAN, defaultValue: false, allowNull: false },
        CreatedOn: { type: DataTypes.DATE, defaultValue: DataTypes.NOW, allowNull: false }
      }, { transaction: t });

      await queryInterface.addConstraint('notification_master', {
        fields: ['UserId'], type: 'foreign key', name: 'fk_notification_user',
        references: { table: 'user_master', field: 'UserId' },
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
      await queryInterface.removeConstraint('notification_master', 'fk_notification_user', { transaction: t });
      await queryInterface.dropTable('notification_master', { transaction: t });
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
};

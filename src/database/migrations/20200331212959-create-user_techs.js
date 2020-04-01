module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_techs', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        }
      },
      tech_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'techs',
          key: 'id',
        }
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('user_techs');
  },
};

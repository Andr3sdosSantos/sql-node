module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('addresses', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      /**
       * Referencia qual é o usuário dono desse endereço
       */
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // Cria uma chave estrangeira dentro da tabela
          /**
           * Referencia uma outra tabela -> model: tabela de 'users'
           *                             -> key: campo 'id'
           */
          model: 'users',
          key: 'id',
        },
        // onUpdate - se o 'id' de relacionamento muda é alterado também na tabela que o referenciou
        onUpdate: 'CASCADE',
        // onDelete - se um 'users' for deletado os endereços são todos deletados, mas pode usar: 'SET NULL', 'RESTRICT', ...
        onDelete: 'CASCADE',
      },
      zipcode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    return queryInterface.dropTable('addresses');
  },
};

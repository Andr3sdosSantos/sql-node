// A 'migration' sempre é criada mostrando o tempo que ela foi criada.
module.exports = {
  up: (queryInterface, Sequelize) => {
    // UP - server para dizer o que essa migration vai realizar dentro do banco de dados.
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      // São automáticos apenas para registrar nos campos, mais devem ser criados manualmente
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
    // DOWN - se algo der errado, por aqui você pode deletar a tabela.
    return queryInterface.dropTable('users');
  },
};

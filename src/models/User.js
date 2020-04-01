const { DataTypes, Model } = require('sequelize');

class User extends Model {
  static init(connection) {
    // init(connection) - recebe a conexão com a base de dados - PADRÃO
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      {
        sequelize: connection, // Redirecionando o padrão 'sequelize' para 'connection'
      }
    );
  }

  /**
   * Quando se faz uma associação é necessários, às vezes fazer a associação reversa,
   * por exemplo, você tem uma tabela A que fez associação de 1 para 1 com uma tabela B,
   * para que se possa usar dados da tabela B em conjunto com a tabela A deve-se fazer a 
   * associação reversa. 
   */
  
  // hasMany - um usuário tem vários endereços e um endereço pertence a um usuário
  static associate(models) {
    this.hasMany(models.Address, {
      foreignKey: 'user_id', // Nesse caso 'foreignKey' está apenas indicando qual coluna está relacionada
      as: 'addresses',
    });
    // N para N sempre é 'belongsToMany'
    // Atenção as mudanças: -> foreignKey e as 
    this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' })
  }
}

module.exports = User;

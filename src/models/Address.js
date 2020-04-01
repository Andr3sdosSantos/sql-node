const { DataTypes, Model } = require('sequelize');

class Address extends Model {
  static init(connection) {
    super.init(
      {
        zipcode: DataTypes.STRING,
        street: DataTypes.STRING,
        number: DataTypes.INTEGER,
      },
      {
        sequelize: connection,
      }
    );
  }

  /**
   * Função associate -> recebs' como parâmetro
   */
  static associate(models) {
    // 'belongsTo' -> pertence a um único registro
    // eslint-disable-next-line no-undef
    this.belongsTo(models.User, {
      /**
       * foreignKey -> chave estrangeira, é o atributo que passa qual que é a chave estrangeira que faz o relacionamento
       */
      foreignKey: 'user_id',
      /**
       * Como quero nomear, usa-se o 'as'
       */
      as: 'user',
    });
  }
}

// belongsToMany -> pertence a vários registros

module.exports = Address;

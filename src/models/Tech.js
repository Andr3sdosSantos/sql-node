const { DataTypes, Model } = require('sequelize');

class Tech extends Model {
  static init(connection) {
    super.init(
      {
        name: DataTypes.STRING,
      },
      {
        sequelize: connection,
        tableName: 'techs'
      }
    );
  }
  static associate(models) {
    // Uma tecnologia pertence a vários usuários, por isso 'belongsToMany'
    /**
     * through - qual o nome da tabela que vai relacionar 'usuários' com 'tecnologia', 
     * nesse caso é 'user_techs', está presente no Postgres
     */
    this.belongsToMany(models.User, { foreignKey: 'tech_id', through: 'user_techs', as: 'users' })
  }
}

module.exports = Tech;

# SQL no Node.js com Sequelize (ORM)

[Sequelize](https://sequelize.org/v5/manual/) é um ORM para Node.js baseado em `promises` para a maioria dos bancos de dados relacionais. Pode ser usado a partir da versão 6 do Node, suporta o ES6.

## Como começar?

Suponho que você já tenha um projeto aberto com Express.js rodando.

Antes de tudo você precisa adicionar o `Sequelize` e a CLI dele, vou exemplificar com o `yarn`, mas fique a vontade para escolher:

 `> yarn add sequelize` 
 
Agora vamos adicionar a CLI


&nbsp;`> yarn add sequelize-cli` 

Feito isso, vamos importar nossa primeira **migration**, antes disso vamos passar rapidamente nas configurações do database.

Eu gosto muito do [Docker](https://www.docker.com/), por isso tenho um contâiner nele chamando o Postgresql. 

Então, seguindo o diretório `src/config/database.js` eu passo algumas configurações, ficam assim:

```
module.exports = {
  host: '127.0.0.1',
  username: nome-do-seu-username,
  database: nome-da-sua-database,
  password: senha-do-seu-database,
  port: porta-que-está-seu-database,
  define: {
    timestamps: true,
    underscored: true,
  }
}
```

Feito isso, o próximo passo é criar o arquivo `.sequelizerc` na **raíz do projeto**. Esse arquivo é o responsável por direcionar todo o caminho das configurações do `sequelize` dentro do seu projeto.

```
  module.exports = {
    config: resolve(__dirname, 'src', 'config', 'database.js'),
    'migrations-path': resolve(__dirname, 'src', 'database', 'migrations'),
    'models-path': resolve(__dirname, 'src', 'app', 'models'),
  }
```

Feito isso, o `sequelize` já sabe onde encontrar/colocar cada configuração passada pela CLI. Então bora configurar nossa **migration**.

`> yarn sequelize migration:create --name create-users`

No diretório: `src/database/migrations` deve aparecer algo assim: 

```
  module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', { id: Sequelize.INTEGER },
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
```

Vamos então criar algumas colunas: 

```
  module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      password: {
        type: Sequelize.STRING,
        allowNull: false,
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
    return queryInterface.dropTable('users');
  },
};
```

Lembrando que `created_at` e `updated_at` só é necessário porque passamos o `timestamps: true` nas configurações.

Feito isso, vamos importar nossa **migration**:

`> yarn sequelize db:migrate`

Pronto, migration criada e exportada.


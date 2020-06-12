# SQL em Node.js com Sequelize

O noSQL - segue uma estrutura 'schema free', significa que ele pode ter sua estrutura alterada 
em tempo de execução. -> [ + performance - relacionamentos ]

O SQL - é melhor para trabalhar em uma estrutura RELACIONAL, pois ele facilitam as relações entre as tabelas e, 
em comparação com o noSQL, as chances de erro é menor na criação de um projeto grande. -> [ - performance + relacionamentos ]

migrations(só nos bancos SQL) - é um controle de versão da base de dados. 

Knex.js - é um QueryBuilder, é uma camada de abstração acima, por exemplo,

* ### Inserindo direto pelo banco: 

const Text = 'INSERT INTO users(name, email) VALUES($1, $2) RETURNING *'
const values = ['Andres', 'andres.com']

* ### Inserindo com o QueryBuilder:

Knex('users').insert({ name: 'Andres', email: 'andres.com'})

Obs: Normalmente os QueryBuilders são melhores, pois essa linha de comando vai funcionar no 
MSSQL, Postgres, MySQL, ...

ORM - Sequelize -> aqui você define um 'model', o model define como vai ser a comunicação da nossa aplicação com o 
banco de dados.

IMPORTANTE! Quando cria-se um model com o nome 'User', por exemplo, automaticamente o Sequelize entende que tem uma tabela 
na aplicação com o nome 'users', ele sempre vai pluralizar o nome.

Exemplo de um MODEL de USER -> 

class User extends Model {}
User.init({
  username: DataTypes.STRING,
  birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });
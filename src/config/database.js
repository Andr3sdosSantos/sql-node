module.exports = {
  dialect: 'postgres', // Dialeto que vai ser usado, pode ser: Postgres, MySQL, ...
  host: 'localhost', // Onde está sendo execultado.
  username: 'postgres', // Nome do arquivo que está criado no Docker.
  password: 'sqlnode', // Senha de criação do docker que ele está usando.
  database: 'sqlnode', // Nome da base que vai ser usada.
  port: '5435', // Porta em que ele vai rodar.
  define: {
    timestamps: true,
    /* Cria duas tabelas dentro do banco, verifica data de edição e criação da tabela.
     * -> created_at(...) : updated_at(...)
     */
    underscored: true, // Define que os nomes de tabelas e colunas fiquem no formato 'snake_case'
  },
};

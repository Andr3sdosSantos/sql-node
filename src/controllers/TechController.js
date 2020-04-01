const Tech = require('../models/Tech');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      // through: { attributes: [] } -> 'attributes' não permite o retorno de 'user_techs'
      // { attributes: ['name'] } -> nesse caso ele traria só os nomes da tabela 'techs' 
      include: { 
        association: 'techs', 
        attributes: ['name'],
        through: { attributes: ['user_id'] }, // Retorna os atributos da tabela pivô
      }, 
    });

    return res.json(user.techs);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    // findOrCreate() -> procura por uma tecnologia, se não achar ele cria uma.
    const [ tech ] = await Tech.findOrCreate({ 
      where: { name }, // Procure uma tecnologia onde o nome seja { name }
    });

    /**
     * Quando se cria um relacionamento de N para N no Sequelize ele monta um monte de funcionalidades 
     * a mais, por exemplo o 'add', que nós setamos com 'addTech()' e depois passamos o model '(tech)' 
     * dentro do 'addTech(tech)' para que ele possa ter acesso e criar a tecnologia se ele não achou. 
     */
    await user.addTech(tech);

    return res.json(tech);
  },

  async delete(req, res) {
    const { user_id } = req.params;
    const { name } = req.body;

    const user = await User.findByPk(user_id);

    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const tech = await Tech.findOne({
      where: { name },
    });

    await user.removeTech(tech);

    return res.json();
  }
};

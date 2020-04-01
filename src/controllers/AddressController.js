const Address = require('../models/Address');
const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const { user_id } = req.params;

    const user = await User.findByPk(user_id, {
      /**
       * Todo método 'find' pode ser passado o parâmetro 'include', que permite
       * incuir associações, nesse caso 'address'
       */
      include: { association: 'addresses' }
    });

    return res.json(user.addresses);
  },

  async store(req, res) {
    const { user_id } = req.params;
    const { zipcode, street, number } = req.body;

    // Buscando o users pelo 'id' passado na URL
    const user = await User.findByPk(user_id);
    // Verificando se ele existe
    if (!user) {
      return res.status(400).json({ error: 'User does not exists' });
    }

    const address = await Address.create({
      zipcode,
      street,
      number,
      user_id, // É necessário passar o 'user_id' na criação
    });

    return res.json({ address });
  },
};

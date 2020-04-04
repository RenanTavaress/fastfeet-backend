const yup = require('yup');

const DeliveryMan = require('../models/DeliveryMan');

class DeliverymanController {
   async index(req, res) {
      const { id } = req.params;

      const deliveryMan = await DeliveryMan.findByPk(id);

      return res.json(deliveryMan);
   }



   async store(req, res) {
      const schema = yup.object().shape({
         name: yup.string().required(),
         email: yup.string().email().required(),
      });

      if (!(await schema.isValid(req.body))) {
         return res.status(401).json({ error: 'Validation fails' });
      }

      const userExist = await DeliveryMan.findOne({ where: { email: req.body.email } });

      if (userExist) {
         return res.status(400).json({ error: 'User already exists' });
      }
      

      const {
         id, name, email, avatar_id,
      } = await DeliveryMan.create(req.body);
      
      return res.json({ 
         id, name, email, avatar_id,
      });
   }
}

module.exports = new DeliverymanController();

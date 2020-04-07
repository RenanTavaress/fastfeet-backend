const yup = require('yup');

const DeliveryMan = require('../models/DeliveryMan');
const File = require('../models/File');

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

   async update(req, res) {
      const { id } = req.params;
      const { name, email, avatar_id } = req.body;


      if (avatar_id) { 
         const avatarExists = await File.findByPk(avatar_id);

         if (!avatarExists) {
            return res.status(401).json({ erro: 'Avatar does is not exists' });
         }
      }

      const deliveryMan = await DeliveryMan.findByPk(id);

      if (!deliveryMan) {
         return res.status(401).json({ erro: 'Deliveryman does not exists' });
      }


      if (email !== DeliveryMan.email) {
         const deliveryExist = await DeliveryMan.findOne({ where: { email: req.body.email } });
         
         if (deliveryExist) {
            return res.status(400).json({ error: 'User already exists' });
         }
      }


      await deliveryMan.update({ id, email, avatar_id });

      const { avatar } = await DeliveryMan.findByPk(id, {
         include: [{
            model: File,
            as: 'avatar',
            attributes: ['id', 'path', 'url'],
         }],
      });
     

      return res.json({ 
         id, name, email, avatar, 
      });
   }

   async delete(req, res) {
      const { id } = req.params;

      const deliveryMan = await DeliveryMan.findByPk(id);

      if (!deliveryMan) {
         return res.status(401).json({ erro: 'Deliveryman does not exists' });
      }

      await deliveryMan.destroy();

      return res.json({});
   }
}

module.exports = new DeliverymanController();

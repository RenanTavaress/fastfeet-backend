const Delivery = require('../models/Delivery');
const DeliveryMan = require('../models/DeliveryMan');
// const File = require('../models/File');
const Recipients = require('../models/Recipients');


class DeliveryController {
   async store(req, res) {
      const { product_name, recipient_id, deliveryman_id } = req.body;

      const deliverymanExists = await DeliveryMan.findByPk(deliveryman_id);

      const recipientsExists = await Recipients.findByPk(recipient_id);
      
      if (!deliverymanExists) {
         return res.status(400).json({ error: 'Deliveryman does not exist' });
      }

      if (!recipientsExists) {
         return res.status(400).json({ error: 'recipients does not exist' });
      }

      const delivery = await Delivery.create({
         product_name,
         recipient_id,
         deliveryman_id,
      });

      return res.json(delivery);
   }
}



module.exports = new DeliveryController();

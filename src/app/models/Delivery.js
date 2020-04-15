const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Delivery extends Model {
   static init(sequelize) {
      super.init({
         product_name: Sequelize.STRING,
         canceled_at: Sequelize.DATE,
         start_date: Sequelize.DATE,
         end_date: Sequelize.DATE,
      }, {
         sequelize,
         tableName: 'delivery',
      });

      return this;
   }

   static associate(models) {
      this.belongsTo(models.Recipients, { foreignKey: 'recipient_id', as: 'recipient' });
      this.belongsTo(models.DeliveryMan, { foreignKey: 'deliveryman_id', as: 'deliveryManId' });
      this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
   }
}

module.exports = Delivery;

const { Model, Sequelize } = require('sequelize');

class DeliveryMan extends Model {
   static init(sequelize) {
      super.init({
         name: Sequelize.STRING,
         email: Sequelize.STRING,
      }, {
         sequelize,
         tableName: 'deliveryMan',
      });

      return this;
   }

   static associate(models) {
      this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
   }
}

module.exports = DeliveryMan;

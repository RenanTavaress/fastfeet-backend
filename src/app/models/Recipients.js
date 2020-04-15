const { Model } = require('sequelize');
const Sequelize = require('sequelize');

class Recipients extends Model {
   static init(sequelize) {
      super.init({
         nome: Sequelize.STRING,
         rua: Sequelize.STRING,
         numero: Sequelize.STRING,
         complemento: Sequelize.STRING,
         estado: Sequelize.STRING,
         cidade: Sequelize.STRING,
         cep: Sequelize.STRING,
      }, {
         sequelize,
      });

      return this;
   }
}

module.exports = Recipients;

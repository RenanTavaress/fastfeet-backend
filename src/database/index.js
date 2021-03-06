const Sequelize = require('sequelize');
const dataBaseConfig = require('../config/database');
const User = require('../app/models/User');
const Recipients = require('../app/models/Recipients');
const File = require('../app/models/File');
const DeliveryMan = require('../app/models/DeliveryMan');
const Delivery = require('../app/models/Delivery');


const models = [User, Recipients, File, DeliveryMan, Delivery];

class DataBase {
   constructor() {
      this.init();
   }

   init() {
      this.connection = new Sequelize(dataBaseConfig);

      models.map((model) => model.init(this.connection))
         .map((model) => model.associate && model.associate(this.connection.models));
   }
}

module.exports = new DataBase();

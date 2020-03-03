const Sequelize = require('sequelize');
const dataBaseConfig = require('../config/database');
const User = require('../app/models/User');
const Recipient = require('../app/models/Recipients');

const models = [User, Recipient];

class DataBase {
   constructor() {
      this.init();
   }

   init() {
      this.connection = new Sequelize(dataBaseConfig);

      models.map((model) => model.init(this.connection));
   }
}

module.exports = new DataBase();

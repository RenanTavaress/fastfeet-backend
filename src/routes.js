const { Router } = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const SessionController = require('./app/controllers/SessionsController');
const authHeaders = require('./app/middlewares/auth');
const RecipientsController = require('./app/controllers/RecipientsController');
const DeliverymanController = require('./app/controllers/DeliverymanController');
const FileController = require('./app/controllers/FileController');
const DeliveryController = require('./app/controllers/DeliveryController');

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authHeaders);

routes.get('/deliveryman/:id', DeliverymanController.index);

routes.post('/recipient', RecipientsController.store);
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/deliveryman', DeliverymanController.store);
routes.post('/delivery', DeliveryController.store);

routes.put('/recipient/:id', RecipientsController.update);
routes.put('/deliveryman/:id', DeliverymanController.update);

routes.delete('/deliveryman/:id', DeliverymanController.delete);


module.exports = routes;

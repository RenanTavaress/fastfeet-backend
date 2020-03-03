const { Router } = require('express');
const SessionController = require('./app/controllers/SessionsController')
const authHeaders = require('./app/middlewares/auth')
const RecipientsController = require('./app/controllers/RecipientsController')

const routes = new Router()

routes.post('/sessions', SessionController.store)

routes.use(authHeaders)
routes.post('/recipient', RecipientsController.store)
routes.put('/recipient/:id', RecipientsController.update)

module.exports = routes
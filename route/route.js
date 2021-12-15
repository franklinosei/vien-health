const express = require('express');
const { route } = require('express/lib/application');

const responseController = require('../controllers/responseController');
const routes = express.Router();
// const auth = require('../middleware/auth');

routes.post('/login', responseController.login)
routes.post('/register', responseController.register)
routes.get('/logout', responseController.logout)



module.exports = {routes};
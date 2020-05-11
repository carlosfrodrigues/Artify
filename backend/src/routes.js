const express = require('express');
const creatorsController = require('./controllers/creatorsController');
const artsController = require('./controllers/artsController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const searchController = require('./controllers/searchController');
const verifyJWT = require('./security/verifyJWT');

const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/creators', creatorsController.index);
routes.post('/creators', creatorsController.create);

routes.post('/arts', verifyJWT, artsController.create);
routes.get('/arts', artsController.index);
routes.delete('/arts/:id', verifyJWT, artsController.delete);
routes.put('/arts/:id', verifyJWT, artsController.update);

routes.get('/profile', verifyJWT, profileController.index);

routes.get('/search', searchController.index);

module.exports = routes;
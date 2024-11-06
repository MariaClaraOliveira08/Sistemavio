const router = require('express').Router();
const userController = require('../controllers/userController');
const organizadorController = require('../controllers/organizadorController');
const eventoController = require('../controllers/eventoController');

//rotas userController
 router.post('/user', userController.createUser);
 router.get('/user', userController.getAllUsers);
// router.post('/user/login', userController.postLogin); 
// router.get('/user/:cpf', userController.getUserById);
 router.put('/user/', userController.updateUser);
 router.delete('/user/:cpf', userController.deleteUser);

 //rotas organizadorController
router.post('/organizador', organizadorController.createOrganizador);
router.get('/organizador', organizadorController.getAllOrganizadores);
// router.get('/organizador/:id', organizadorController.getOrganizadorById);
router.put('/organizador', organizadorController.updateOrganizador);
router.delete('/organizador/:id', organizadorController.deleteOrganizador);

//rotas eventoController
router.post('/evento', eventoController.createEvento);
router.get('/evento', eventoController.getAllEventos);
router.put('/evento', eventoController.updateEvento);

module.exports = router;

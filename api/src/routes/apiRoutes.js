const router = require('express').Router();
const userController = require('../controllers/userController');
const organizadorController = require('../controllers/organizadorController');

router.post('/user', userController.createUser);
router.post('/user/login', userController.postLogin); 
router.get('/user', userController.getAllUsers);
router.get('/user/:cpf', userController.getUserById);
router.put('/user/', userController.updateUser);
router.delete('/user/:cpf', userController.deleteUser);

router.post('/organizador', organizadorController.createOrganizador);
router.get('/organizador', organizadorController.getAllOrganizadores);
router.get('/organizador/:id', organizadorController.getOrganizadorById);
router.put('/organizador', organizadorController.updateOrganizador);
router.delete('/organizador/:id', organizadorController.deleteOrganizador);

module.exports = router;

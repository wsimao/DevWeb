const express = require('express');
const router = express.Router();

const Auth = require('../middleware/middleware');
const AuthValidator = require('../validators/authvalidator');
const UserValidator = require('../validators/UserValidator');

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');


router.get('/ping', (req, res) => {
    res.json({ pong: true });
});

router.get('/home', (req, res) => {
    res.json('teste')
});

//processo de login
router.post('/user/singin', AuthValidator.signin, AuthController.signin);
router.post('/user/signup', AuthValidator.signup, AuthController.signup);

//obter informações do usuário /rota privada  -> criar um middleware --> token para verifcar
router.get('/user/me', Auth.private, UserController.info);
router.put('/user/me', UserValidator.editAction, Auth.private, UserController.editAction); //*

module.exports = router;
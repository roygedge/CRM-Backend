const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const callController = require('../controllers/call');

router.post('/users/register', userController.register);
router.post('/users/login', userController.login);
router.post('/users/manager/register', userController.createManager);

router.get('/calls/', authenticateJWT, callController.getAllCalls);
router.get('/calls/:number', authenticateJWT, callController.getCallsByNumber);
router.get('/calls/:callSid', authenticateJWT, callController.getCallById);

router.patch('users/:id', authenticateJWT, userController.grantPremissions);

module.exports = router;
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post('/signup', userCtrl.signup);        
router.post('/login', userCtrl.login);
router.get('/me', auth, userCtrl.userProfil);
router.get('/admin/users', auth, userCtrl.getAllUsers);
router.put('/users',auth, userCtrl.updateUser);
router.delete('/users/:id', auth, userCtrl.deleteUser);

module.exports = router;

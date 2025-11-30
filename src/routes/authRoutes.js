const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     tags: [Auth]
 */
router.post('/login', controller.login);

module.exports = router;

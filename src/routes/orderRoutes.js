const express = require('express');
const router = express.Router();
const controller = require('../controllers/orderController');

const auth = require('../middleware/authMiddleware');
const validate = require('../middleware/validate');
const { orderSchema } = require('../validators/orderValidator');

/**
 * Rota pública: listar
 */
router.get('/order/list', controller.listOrders);

/**
 * Rotas protegidas: login necessário
 */
router.get('/order/:orderId', auth, controller.getOrder);
router.post('/order', auth, validate(orderSchema), controller.createOrder);
router.put('/order/:orderId', auth, validate(orderSchema), controller.updateOrder);
router.delete('/order/:orderId', auth, controller.deleteOrder);

module.exports = router;

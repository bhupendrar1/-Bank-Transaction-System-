const { Router } = require('express');
const authMiddleware = require('../middlewares/auth.middleware');


const transactionRouter = Router();

/**
 * - POST /api/transactions/
 * - Create a new transaction
 */

transactionRouter.post('/', authMiddleware.authenticateUser, require('../controllers/transaction.controller').createTransactionController);


module.exports = transactionRouter;

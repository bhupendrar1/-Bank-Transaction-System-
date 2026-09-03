const transactinModel = require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const accountModel = require('../models/account.model');
const emailService = require('../services/email.service');

/**
 * - Create a new transaction
 *  THE 10- STEP TRANSACTION PROCESS
 * 1. Validate request
 * 2. Validate Idempotence Key
 * 3. Check account status
 * 4. Derive Sender balance from ledger
 * 5. Create transaction (PENDING)
 * 6. Create DEBIT ledger entry
 * 7. Create CREDIT ledger entry
 * 8. Mark transaction as COMPLETED
 * 9. Commit MongoDB Session 
 * 10. Send email notification 
 */


async function createTransaction(req, res) {

   /**
    * 1. Validate request
    */
   const {fromAccount, toAccount, amount, idempotenceKey } = req.body;

    if( !fromAccount || !toAccount || !amount || !idempotenceKey ) {
          return res.status(400).json({ 
            message: 'fromAccount , toAccount , amount , and idempotenceKey are required',
            
         })
    }

    const fromUserAccount = await accountModel.findOne({
      _id: fromAccount,
    })

    const toUserAccount = await accountModel.findOne({
      _id: toAccount,
    })

    if(!fromUserAccount || !toUserAccount) {
      return res.status(404).json({
        message: 'Invalid fromAccount or toAccount'
      })
    }


    /**
     * 2. Validate Idempotence Key
     */

    const isTransactionAlreadyExists = await transactinModel.findOne({
      idempotenceKey: idempotenceKey
    })

    if(isTransactionAlreadyExists) {
       if(isTransactionAlreadyExists.status === 'COMPLETED') {
        return res.status(200).json({
          message: 'Transaction already completed',
          transaction: isTransactionAlreadyExists
        })
       } 

       if(isTransactionAlreadyExists.status === 'PENDING') {
        return res.status(200).json({
          message: 'Transaction is still pending',
        })
       }

       if(isTransactionAlreadyExists.status === 'FAILED') {
         return res.status(200).json({
            message: 'Transaction has failed',
         })
          }

          if(isTransactionAlreadyExists.status === 'REVERSED') {
            return res.status(200).json({
              message: 'Transaction has been reversed',
            })
          }
           
    }


    /**
     * 3. Check account status
     */

    if (fromUserAccount.status !== 'ACTIVE' || toUserAccount.status !== 'ACTIVE') {
      return res.status(400).json({
        message: 'From or to account is not active'
      })
    }

    /**
     * 4. Derive Sender balance from ledger
     */

    
   
}





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

   const {fromAccount, toAccount, amount, idempotenceKey } = req.body;

}
   
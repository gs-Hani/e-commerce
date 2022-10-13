const { getUserById, updateUser, updateCredit, deleteUser } = require('../queiries/usersQueries');

async function userById (user_id) {
    try {
        const foundUser = await getUserById(user_id);
        if  (!foundUser) {
            const err        = new Error('could not find user');
                  err.status = 401;
            throw err;
          };
          return foundUser;

    } catch (err) {
      throw (err);
    }
};

async function updateAccount (data) {
    try {
        const updatedAccount = await updateUser(data);
        if  (!updatedAccount) {
            const err        = new Error('could not update account');
                  err.status = 401;
            throw err;
          };
          return updatedAccount;

    } catch (err) {
      throw (err);
    }
};

async function updateFunds (data) {
    try {
        const newFunds       = await updateCredit(data);
        if  (!newFunds) {
            const err        = new Error('Transaction failed');
                  err.status = 502;
            throw err;
        };
        return newFunds;

    } catch (err) {
      throw (err);
    }
};

async function deleteAccount (user_id) {
    try {
        const deletedAccoount = await deleteUser(user_id);
        if   (deletedAccoount) {
            const err        = new Error('account was not deleted');
                  err.status = 404;
            throw err;
          };
          return deletedAccoount;

    } catch (err) {
      throw (err);
    }
};

module.exports = {
    userById,
    updateAccount,
    updateFunds,
    deleteAccount
};
const { getUserById, updateUser, deleteUser } = require('../queiries/usersQueries');

async function userById (user_id) {
    try {
        const foundUser = await getUserById(user_id);
        if (!foundUser) {
            console.log('could not find user');
            res.sendStatus(401);
            return;
          };
          return foundUser;

    } catch (err) {
        console.log(err);
    }
};

async function updateAccount (data) {
    try {
        const updatedAccount = await updateUser(data);
        if (!updatedAccount) {
            console.log('could not update account');
            res.sendStatus(401);
            return;
          };
          return updatedAccount;

    } catch (err) {
        console.log(err);
    }
};

async function deleteAccount (id) {
    try {
        const deletedAccoount = await deleteUser(id);
        if (!deletedAccoount) {
            console.log('account deleted');
            res.sendStatus(404);
            return;
          };
          return deletedAccoount;

    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    userById,
    updateAccount,
    deleteAccount
};
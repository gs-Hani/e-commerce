const express = require('express');
const router = express.Router();
const { userById, updateAccount, deleteAccount } = require('../services/usersService');
const { passwordHash } = require('../services/authService')

module.exports = (app) => {

    app.use('/users', router);

    router.get('/:userId', async (req,res) => {
        try {
            const { userId } = req.params;
            const response = await userById(userId);
            res.status(200).send(response);
          } catch (err) {
            next(err);
        };
    });
    router.put('/:userId', async (req,res,next) => {
        try {
            const { userId } = req.params;
            let { user_name, email, password, date_of_birth } = req.body;
            password = await passwordHash(password);
            const data = { user_name, email, password, date_of_birth };

            const response = await updateAccount({ id: userId, ...data });
            res.status(200).send(response);
          } catch (err) {
            next(err);
        }; 
    });
    router.delete('/:userId', async (req,res) => {
        try {
            const { userId } = req.params;

            const response = await deleteAccount(userId);
            res.status(404).send(response);
          } catch (err) {
            next(err);
        };
    });
};


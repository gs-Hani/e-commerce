const express = require('express');
const router  = express.Router();
const { userById, 
        updateAccount, 
        deleteAccount } = require('../services/usersService');
const { passwordHash }  = require('../services/authService')

module.exports = (app) => {

    app.use('/users', router);

    router.get('/:user_id', async (req,res) => {
        try {

            const /*-------------------*/ { user_id } = req.params;
            const response = await userById(user_id);
            res.status(200).send(response);

          } catch (err) {
            next  (err);
        };
    });

    router.put('/:user_id', async (req,res,next) => {
        try {
            const { user_id }/*--------------------------------------*/= req.params;
            let   { user_name, email,        password, date_of_birth } = req.body;
            password   =  await passwordHash(password);
            const data = { user_name, email, password, date_of_birth };

            const/*------------*/response = await updateAccount({ user_id, ...data });
            res.status(200).send(response);

          } catch (err) {
            next  (err);
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


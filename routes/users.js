const usersService = require('../services/usersService');

module.exports = {
    app.get('/users', usersService.getUsers(data)),
    app.get('/users/:id', usersService.getUserById(data)),
    app.post('/users', usersService.createUser(data)),
    app.put('/users/:id', usersService.updateUser(data)),
    app.delete('/users/:id', usersService.deleteUser(data)),
};


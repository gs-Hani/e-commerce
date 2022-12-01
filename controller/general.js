exports.home = (req, res) => {
    try { res.send('<h1>Hello from your Express.js server!!</h1>');
    } catch (error) { return res.status(400).json({ error }); }
};

const express = require('express');
const router = express.Router();

const dataAccess = require('../data-access');


router.get('/api/v1/private-api', async (req, res) => {

    res.json({ message: 'private api', requestUser: req.user });
    
});

router.get('/api/v1/users', async (req, res) => {

    const users = await dataAccess.getUsers();

    res.json(users);
});


module.exports = router;

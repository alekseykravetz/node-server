const express = require('express');

const dataAccesss = require('../data-access');


const router = express.Router();

router.get('/api/v1/users', async (req, res) => {

    const users = await dataAccesss.getUsers();

    res.json(users);
});

router.get('/api/v1/user/:id/:name', async (req, res) => {
    const { id, name } = req.params;

    const resObj = {
        userId: id,
        name: name
    };

    res.json(resObj);
});



module.exports = router;



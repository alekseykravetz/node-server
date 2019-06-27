const express = require('express');
const router = express.Router();

const dataAccess = require('../data-access');


router.get('/api/v1/users', async (req, res) => {

    const users = await dataAccess.getUsers();

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

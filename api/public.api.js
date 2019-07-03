const express = require('express');
const router = express.Router();

const dataAccesss = require('../data-access');


router.get('/api/v1/server-histories', async (req, res) => {

    const serverHistory = await dataAccesss.getServerHistories();

    res.json(serverHistory);
});

router.get('/api/v1/server-history/:id', async (req, res) => {

    const { id } = req.params;

    const serverHistory = await dataAccesss.getServerHistory(id);

    res.json(serverHistory);
});

router.get('/api/v1/server-ping/:name/:message', async (req, res) => {
    
    const { name, message } = req.params;

    res.json({name, message});
});


module.exports = router;

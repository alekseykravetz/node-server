const express = require('express');
const router = express.Router();


router.get('/api/v1/private-api', async (req, res) => {

    res.json({ message: 'private api', requestUser: req.user });
    
});


module.exports = router;

const express = require('express');
const router = express.Router();

const jwtHelper = require('../helpers/jwt.helper');


router.use(async (req, res, next) => {
   
    const bearer = req.get('AUTHORIZATION');
    if (!bearer) {
        res.status(400).send('Token not provided'); // denotes a mal-formed HTTP request
        return;
    }

    try {
        const token = bearer.substring(7);
        const result = await jwtHelper.validateToken(token);
        req.user = result;

        next();

    } catch (e) {
        console.log(e);
        res.status(401).json(`Token invalid: ${JSON.stringify(e)}`); // denotes the the request was unauthorised
    }
});


module.exports = router;


// const Sentry = require('@sentry/node');
const express = require('express');
const jwtHelper = require('../helpers/jwt.helper');


const router = express.Router();

router.use(async (req, res, next) => {
    const bearer = req.get('AUTHORIZATION');

    if (!bearer) {
        res.status(403).json('Token not provided');
        return;
    }

    const token = bearer.substring(7);

    try {
        const result = await jwtHelper.validateToken(token);

        req.user = result;

        next();
    } catch (e) {
        console.log(e);

        res.status(403).json(`Token invalid: ${JSON.stringify(e)}`);
    }
});

module.exports = router;

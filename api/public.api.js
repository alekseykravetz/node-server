const express = require('express');

const dataAccess = require('../data-access');


const bcryptHelper = require('../helpers/bcrypt.helper');
const jwtHelper = require('../helpers/jwt.helper');


const router = express.Router();

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


const EXPIRY_FOR_JWT = 12;
function getUnixTimeForXHoursAhead(hours) {
    return parseInt(new Date().getTime() / 1000, 10) + (hours * 60 * 60);
}

router.post('/api/v1/signup', async (req, res) => {
    const { email, display_name, avatar_url, password } = req.body;

    let user = await dataAccess.getUserByEmail(email);

    if (user) {
        res.status(403).json('User already exists');
        return;
    }

    if (!password) {
        res.status(403).json('password missing');
        return;
    }

    const hashedPassword = await bcryptHelper.hashPassword(password);

    user = await dataAccess.createNewUser(email, hashedPassword, display_name, avatar_url);

    delete user.password;

    const refresh_token = jwtHelper.createToken(user);

    user.exp = getUnixTimeForXHoursAhead(EXPIRY_FOR_JWT);
    const access_token = jwtHelper.createToken(user);

    const result = {
        refresh_token,
        access_token,
    };

    res.json(result);
});

router.post('/api/v1/signin', async (req, res) => {
    const { email, password } = req.body;

    const user = await dataAccess.getUserByEmail(email);

    if (!user) {
        res.status(403).json('Email missing');
        return;
    }

    const isMatch = await bcryptHelper.compareHashedPassword(password, user.password);;

    if (!isMatch) {
        res.status(403).json('password is incorrect');
        return;
    }

    delete user.password;

    const refresh_token = jwtHelper.createToken(user);

    user.exp = getUnixTimeForXHoursAhead(EXPIRY_FOR_JWT);
    const access_token = jwtHelper.createToken(user);

    const result = {
        refresh_token,
        access_token,
    };

    res.json(result);
});



module.exports = router;



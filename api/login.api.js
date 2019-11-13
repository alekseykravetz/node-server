const express = require('express');
const router = express.Router();

const dataAccess = require('../data-access');

const bcryptHelper = require('../helpers/bcrypt.helper');
const jwtHelper = require('../helpers/jwt.helper');


const EXPIRY_FOR_JWT = 12;
function getUnixTimeForXHoursAhead(hours) {
    return parseInt(new Date().getTime() / 1000, 10) + (hours * 60 * 60);
}


router.post('/api/v1/signup', async (req, res) => {
    const { email, password, name, avatarUrl } = req.body;

    const existingUser = await dataAccess.getUserByEmail(email);

    if (existingUser) {
        res.status(403).json('User already exists');
        return;
    }

    if (!password) {
        res.status(403).json('password missing');
        return;
    }

    const hashedPassword = await bcryptHelper.hashPassword(password);

    createdUser = await dataAccess.createUser(email, hashedPassword, name, avatarUrl);

    delete createdUser.password;
    createdUser.exp = getUnixTimeForXHoursAhead(EXPIRY_FOR_JWT);
   
    const accessToken = jwtHelper.createToken(createdUser);

    res.json(accessToken);
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
    user.exp = getUnixTimeForXHoursAhead(EXPIRY_FOR_JWT);
    
    const accessToken = jwtHelper.createToken(user);

    res.json(accessToken);
});


module.exports = router;

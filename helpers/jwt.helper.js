const jwt = require('jsonwebtoken');


const SECRET = 'some secret of some kind @#RCEFW%VDTF$#GTE%45fvetgv4fDSG$E%GF%TG%ESGTG4g5ew5gsebset';

function createToken(user) {
    const token = jwt.sign(user, SECRET);

    return token;
}

function validateToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }
        });
    });
}


module.exports = { createToken, validateToken };

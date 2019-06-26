const bcrypt = require('bcrypt');

const saltRounds = 14;

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) reject(err);
            resolve(hash);
        });
    });
}

function compareHashedPassword(password, encryptedPassword) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, encryptedPassword, (err, isMatch) => {
            if (err) reject(err);
            resolve(isMatch);
        });
    });
}

module.exports = { hashPassword, compareHashedPassword };

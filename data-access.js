const { MongoClient, ObjectId } = require('mongodb');

let db;

async function initConnection() {
    client = await MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true });
    db = client.db('app-db');


    createUser({ name: 'alex', email: 'alex@alex.com' });
}

async function getUsers() {
    return db.collection('user').find({}).toArray();
}

function getUser(userId) {
    return db.collection('user').findOne({ _id: ObjectId(userId) });
}

async function createUser(user) {
    await db.collection('user').insertOne(user);
    return user;
}

function getUserByEmail(email) {
    return db.collection('user').findOne({ email: email.toLowerCase() });
}

async function createNewUser(email, password, display_name, avatar_url) {


    const user = {
        display_name,
        email: email.toLowerCase(),
        password,
        avatar_url,
    };

    await db.collection('user').insertOne(user);

    return user;
}


module.exports = {
    initConnection,
    getUsers,
    getUser,
    createUser,
    getUserByEmail,
    createNewUser,
};
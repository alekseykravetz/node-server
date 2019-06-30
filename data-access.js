const { MongoClient, ObjectId } = require('mongodb');

let db;

async function initConnection() {
    client = await MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true });
    db = client.db('app-db');
}

async function getUsers() {
    return db.collection('user').find({}).toArray();
}

async function getUser(userId) {
    return db.collection('user').findOne({ _id: ObjectId(userId) });
}

async function createUser(user) {
    await db.collection('user').insertOne(user);
    return user;
}

function getUserByEmail(email) {
    return db.collection('user').findOne({ email: email.toLowerCase() });
}

async function createNewUser(email, password, name, avatarUrl) {

    const user = {
        name: name,
        email: email.toLowerCase(),
        password,
        avatarUrl: avatarUrl,
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
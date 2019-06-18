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


module.exports = {
    initConnection,
    getUsers,
    getUser,
    createUser,
};
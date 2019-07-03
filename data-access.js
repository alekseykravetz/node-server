const { MongoClient, ObjectId } = require('mongodb');

let db;

async function initConnection() {
    client = await MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true });
    db = client.db('app-db');

    createServerHistory();
}

async function createServerHistory() {
    const history = await db.collection('serverHistory').insertOne({ start: new Date().toISOString() });
    return history;
}

async function getServerHistories() {
    return db.collection('serverHistory').find({}).toArray();
}

async function getServerHistory(id) {
    return db.collection('serverHistory').findOne({ _id: ObjectId(id) });
}



module.exports = {
    initConnection,
    createServerHistory,
    getServerHistories,
    getServerHistory,
};
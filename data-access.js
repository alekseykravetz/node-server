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

async function getUsers() {
    return db.collection('user').find({}).toArray();
}

async function getUser(userId) {
    return db.collection('user').findOne({ _id: ObjectId(userId) });
}

async function getUserByEmail(email) {
    return db.collection('user').findOne({ email: email.toLowerCase() });
}

async function createUser(email, password, name, avatarUrl) {

    const user = {
        name,
        email: email.toLowerCase(),
        password,
        avatarUrl,
    };

    await db.collection('user').insertOne(user);

    return user;
}

async function getBooks() {
    return db.collection('book').find({}).toArray();
}

async function createBook(book) {
    await db.collection('book').insertOne(book);
    return book;
}

async function deleteBook(bookId) {
    const result = await db.collection('book').deleteOne({ _id: ObjectId(bookId) });
    return result;
}

async function updateBook(book) {

    book._id = ObjectId(book._id);

    const result = await db.collection('book').updateOne({ _id: ObjectId(book._id) }, { $set: book });
    return result;
}

module.exports = {
    initConnection,
    createServerHistory,
    getServerHistories,
    getServerHistory,
    createUser,
    getUsers,
    getUser,
    getUserByEmail,
    getBooks,
    createBook,
    deleteBook,
    updateBook
};
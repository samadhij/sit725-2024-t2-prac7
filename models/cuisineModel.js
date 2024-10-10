const { MongoClient, ServerApiVersion } = require('mongodb');
const client = require("../dbConnection");

let collection;

async function init() {
    if (!collection) {
        try {
            await client.connect();
            console.log("Connected to DB");
            collection = client.db().collection('Cuisines');
            console.log(collection);
        } catch (ex) {
            console.error(ex);
        }
    }
}

async function getAllCuisines() {
    await init();
    return collection.find({}).toArray();
}

async function postCuisine(cuisine) {
    await init();
    return collection.insertOne(cuisine);
}

module.exports = {
    getAllCuisines,
    postCuisine,
};
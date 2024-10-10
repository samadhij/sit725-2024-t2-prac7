const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://samadhijayas:QmaiV8Tgytnwo2LG@cluster0.cxdr5ag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = client;
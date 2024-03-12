import {MongoClient} from 'mongodb'

// connection string-> mongodb://localhost:27017/
const url = process.env.DB_URL

let client;
export const connectToMongoDB =()=>{
    MongoClient.connect(url).then(clientInstance=>{
        client = clientInstance
        console.log('MongoDB connection established');
    }).catch(err=>{
        console.log(err);
    })
}

export const getDB =()=>{
    return client.db()
}
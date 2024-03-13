import {MongoClient} from 'mongodb'

// connection string-> mongodb://localhost:27017/
const url = process.env.DB_URL

let client;
export const connectToMongoDB =()=>{
    MongoClient.connect(url).then(clientInstance=>{
        client = clientInstance
        console.log('MongoDB connection established');
        createCounter(client.db())
    }).catch(err=>{
        console.log(err);
    })
}

export const getDB =()=>{
    return client.db()
}

const createCounter = async(db)=>{
    const existingCounter = await db.collection('counters').findOne({_id:"cartId"})
    if(!existingCounter) {
        await db.collection('counters').insertOne({_id:'cartId', value:0})
    }
}
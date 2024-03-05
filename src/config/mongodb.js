import {MongoClient} from 'mongodb'

// connection string-> mongodb://localhost:27017/
const url = "mongodb://localhost:27017/ecomDB"

const connectToMongoDB =()=>{
    MongoClient.connect(url).then(client=>{
        console.log('MongoDB connection established');
    }).catch(err=>{
        console.log(err);
    })
}

export default connectToMongoDB;
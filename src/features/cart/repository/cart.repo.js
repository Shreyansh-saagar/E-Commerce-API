import { ObjectId } from "mongodb"
import { getDB } from "../../../config/mongodb.js"
import { applicationError } from "../../errors/applicationError.js"


export default class cartRepo{

    constructor(){
        this.collection = 'cart'
    }
    
    async add(productId, userId, quantity){
        try {
            const database = getDB()
            const collection = database.collection(this.collection)
            const counterid = await this.getNextCounter(database)
            

            await collection.updateOne(
                { productId: new ObjectId(productId), userId: new ObjectId(userId) },
                {   $setOnInsert: {_id:counterid},
                    $inc: { quantity: quantity } 
                }, 
                {upsert: true}
            );


        } catch (error) {
            console.log(error);
            throw new applicationError('Something went wrong',500)
        }
    }

    async filter(userId){
        try {
            const database = getDB();
            const collection = database.collection(this.collection)
            return await collection.find({ userId: new ObjectId(userId) }).toArray()            
        } catch (error) {
            console.log(error);
            throw new applicationError('Something went wrong',500)          
        }
    }


    async delete(userId, cartId){
        try {
            const database = getDB();
            const collection = database.collection(this.collection)
            const result = await collection.deleteOne({_id: new ObjectId(cartId), userId: new ObjectId(userId)})
            return result.deletedCount>0
        } catch (error) {
            console.log(error);
            throw new applicationError('Something went wrong',500)          
        }
    }

    async getNextCounter(db){
        const resultDocument = await db.collection('counters').findOneAndUpdate({_id:"cartId"},{$inc:{value:1}},{returnDocument:'after'})
        // console.log(resultDocument);
        // console.log(resultDocument.value);
        return resultDocument.value;
    }
}
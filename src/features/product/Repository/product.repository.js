import {ObjectId}  from "mongodb";
import { getDB } from "../../../config/mongodb.js"
import { applicationError } from "../../errors/applicationError.js"

class productRepository{
    constructor(){
        this.collection = "products";
    }

    async add(newProduct){
        try{
            const db = getDB()
            const collection = db.collection(this.collection)
            await collection.insertOne(newProduct)
            return newProduct
        }catch(e){
            throw new applicationError('Problem in adding product', 400)
        }   
    }

    async getAll(){
        try{
            const db = getDB()
            const collection = db.collection(this.collection)
            return await collection.find().toArray()
        }catch(e){
            throw new applicationError('Problem in fetching products', 500)
        } 
    }

    async getOne(id){
        try{
            const db = getDB()
            const collection = db.collection(this.collection)
            return await collection.findOne({ _id: new ObjectId(id) });
        }catch(e){
            throw new applicationError('Problem in fetching product', 500)
        } 
    }

    async filter(minPrice, maxPrice, category){
        try {
            const db = getDB()
            const collection = db.collection(this.collection)
            let filterExpression ={}
            if(minPrice){
                filterExpression.price = {$gte: parseFloat(minPrice)}
            }if(maxPrice){
                filterExpression.price = {...filterExpression.price,$lte: parseFloat(maxPrice)}
            }if(category){
                filterExpression.category = category
            }
            return await collection.find(filterExpression).project({name:1,price:1,_id:0,ratings:{$slice:1}}).toArray() 
            
        } catch (error) {
            throw new applicationError('Problem in filter product', 500)
        }
    }

    // async rate(userId, productId, rating){
    //     try {
    //         const db = getDB()
    //         const collection = db.collection(this.collection)
    //         await collection.updateOne({ _id: new ObjectId(productId)},{
    //             $push:{
    //                 ratings:{
    //                     userId: new ObjectId(userId),rating
    //                 }
    //             }
    //         })
    //     } catch (error) {
    //         throw new applicationError('Problem in rating product', 500)
    //     }
    // }

    async rate(userId, productId, rating) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const result = await collection.updateOne(
                { _id: new ObjectId(productId), 'ratings.userId': new ObjectId(userId) },
                { $set: { 'ratings.$.rating': rating } }
            );
            if (result.modifiedCount === 0) {
                // If the user has not rated the product before, add a new rating
                await collection.updateOne(
                    { _id: new ObjectId(productId) },
                    { $addToSet: { ratings: { userId: new ObjectId(userId), rating } } }
                );
            }
        } catch (error) {
            console.log(error);
            throw new applicationError('Problem in rating product', 500);
        }
    }

    async averagePricePerCateg(){
        try {
            const db = getDB()
            return await db.collection(this.collection).aggregate([
                {
                    // Stages: get average price per category
                    $group:{
                        _id:"$category",
                        averagePrice:{$avg:"$price"}
                    }
                }
            ]).toArray();

        } catch (error) {
            console.log("Error at average price repository : "+ error);
            throw new applicationError('Problem in rating product', 500);
        }
    }

}

export default productRepository
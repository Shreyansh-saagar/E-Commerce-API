import { getClient, getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import orderModel from "./order.model.js";
import { applicationError } from "../errors/applicationError.js";

export default class OrderRepository {
    constructor() {
        this.collection = "orders";
    }

    async placeOrder(userId) {
        const client = getClient();
        const session = client.startSession();
        session.startTransaction();
        
        try {
            const db = getDB();

            // 1. Get cart items and calculate the total amount
            const items = await this.getTotalAmount(userId, session);
            const finalTotalAmount = items.reduce((acc, item) => acc + item.totalAmount, 0);

            // 2. Create an order
            const newOrder = new orderModel(new ObjectId(userId), finalTotalAmount, new Date());
            await db.collection(this.collection).insertOne(newOrder, { session });

            // 3. Reduce the stock
            for (const item of items) {
                await db.collection('products').updateOne(
                    { _id: item.productId },
                    { $inc: { stock: -item.quantity } },
                    { session }
                );
            }

            // 4. Clear the cart 
            await db.collection('cart').deleteMany({ userId: new ObjectId(userId) }, { session });
            
            await session.commitTransaction();
            session.endSession();

            return;
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            console.error(error);
            throw new applicationError('Problem in transaction processing repo', 500);
        }
    }

    async getTotalAmount(userId, session) {
        const db = getDB();
        const items = await db.collection('cart').aggregate([
            // 1. Get items for user
            { $match: { userId: new ObjectId(userId) } },
            // 2. Collect matching products
            {
                $lookup: {
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "productInfo"
                }
            },
            // 3. Unwind product info
            { $unwind: "$productInfo" },
            // 4. Calculate total amount for each cart item
            { $addFields: { "totalAmount": { $multiply: ["$productInfo.price", "$quantity"] } } }
        ], { session }).toArray();

        return items;
    }
}

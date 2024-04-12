import orderRepository from "./order.repository.js";


export default class orderController{
    constructor(){
        this.orderRepo = new orderRepository();
    }

    async placeOrderController(req,res,next){
        try {
            const userId = req.userId;
            await this.orderRepo.placeOrder(userId)
            res.status(201).send('Order placed successfully')
        } catch (error) {
            console.log(error);         
            return res.status(500).send('Error creating order controller')
        }
    }
}
import cm from '../model/cart.model.js'
import cartRepo from '../repository/cart.repo.js'

export class cartController{
    
    constructor(){
        this.cartrepo = new cartRepo()
    }

    async add(req,res){
        try {
            const productId = (req.query.productId)
            const quantity = parseInt(req.query.quantity)
            const userId = req.userId

            await this.cartrepo.add(productId,userId,quantity)
            res.status(201).send('Item added to cart')
        } catch (error) {
            console.log(error);
            res.status(200).send('Something went wrong')
        }
    }

    async toGetCart(req,res){
        try {
            const userId = req.userId
            const items = await this.cartrepo.filter(userId)
            return res.status(200).json(items)
        } catch (error) {
            console.log(error);
            res.status(200).send('Something went wrong')
        }
    }

    async delete(req, res) {
        const userId = req.userId
        const cartItemId = req.params.id
        const isdeleted = await this.cartrepo.delete(userId, cartItemId)
        if(!isdeleted) {
            return res.status(404).send(error)
        }
        return res.status(200).send('cart item is removed')
    }
}
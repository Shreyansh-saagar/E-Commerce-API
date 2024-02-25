import cm from '../model/cart.model.js'

export class cartController{
    
    add(req,res){
        const productId = parseInt(req.query.productId)
        const quantity = parseInt(req.query.quantity)
        const userId = req.userId

        cm.add(productId,userId,quantity)
        res.status(201).send('Item added to cart')
    }

    toGetCart(req,res){
        const userId = req.userId
        const items = cm.filterCart(userId)
        return res.status(200).json(items)
    }

    delete(req, res) {
        const userId = req.userId
        const cartItemId = req.params.id
        const error = cm.deleteItem(cartItemId, userId)
        if(error){
            return res.status(404).send(error)
        }
        return res.status(200).send('cart item is removed')
    }
}
import um from "../../user/models/user.modal.js"
import pm from "../../product/models/product-model.js"

export default class cartModel{

    constructor(productId,userId,quantity,id){
        this.productId = productId;
        this.userId = userId;
        this.quantity = quantity;
        this.id = id;
    }

    // static add(productId,userId,quantity){
    //     const user = um.getAll().find((u)=>u.id == userId);
    //     if(!user){
    //         return 'User not found'
    //     }

    //     const product = pm.getProducts().find((p)=>p.id == productId)
    //     if(!product){
    //         return 'Product not found'
    //     }

    //     if(quantity <= 0){
    //         return 'Enter valid quantity of products'
    //     }


    //     const id =  cartItem.length + 1
    //     const item = new cartModel(productId,userId,quantity,id)
    //     cartItem.push(item)
    //     return item
    // }

    
    // static filterCart(userId){
    //     const items = cartItem.filter((i)=> i.userId == userId)
    //     return items
    // }

    static deleteItem(cartItemId, userId){
        const cartItemIndex = cartItem.findIndex((i)=> i.id == cartItemId && i.userId == userId)
        if(cartItemIndex == -1){
            return 'Item not found'
        }else{
            cartItem.splice(cartItemIndex, 1)
        }
    }
}

let cartItem = [
    new cartModel(1,2,3,1),
    new cartModel(3,2,2,2),
    new cartModel(1,1,2,3)
]
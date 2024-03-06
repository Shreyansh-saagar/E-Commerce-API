import { applicationError } from "../../errors/applicationError.js";
import um from "../../user/models/user.modal.js"

export default class productModel {
  constructor(name, desc, image, category, price, sizes,id) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.image = image;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  // static getProducts() {
  //   return products;
  // }

  // static singleProduct(id) {
  //   return products.find((p) => p.id == id);
  // }

  // static addProduct(product) {
  //   const id = (products.id = products.length + 1);
  //   product.id = id;
  //   products.push(product);
  //   return product;
  // }

  // static filter(minPrice, maxPrice, category, sizes) {
  //   const f1 = products.filter((p) => {
  //     return (
  //       (!minPrice || p.price >= minPrice) &&
  //       (!maxPrice || p.price <= maxPrice) &&
  //       (!category || p.category == category) &&
  //       (!sizes || sizes.some((size) => p.sizes.includes(size)))
  //     );
  //   });
  //   return f1;
  // }

  // static rateProduct(userID, productID, rating){
  //   // validate user and Product exsistence
  //   const user = um.getAll().find((u)=> u.id == userID)
  //   if(!user){
  //     throw new applicationError('User not found',400)
  //   }

  //   const product = products.find((p)=> p.id == productID)
  //   if(!product){

  //     // user defined error
  //     throw new applicationError('Product not found',400)
  //   }

  //   // check if there are any ratings and if then add ratings into array
  //   if(!product.ratings){
  //     product.ratings = []
  //     product.ratings.push({
  //       userID:userID,rating:rating
  //     })
  //   }else{
  //     // check if user rating is already available
  //     const existingRatingIndex = product.ratings.findIndex((r)=> r.userID == userID)
  //     if(existingRatingIndex >= 0){
  //       product.ratings[existingRatingIndex] = {
  //         userID:userID,rating:rating
  //       }
  //     }else{
  //       // if no existing rating is available
  //       product.ratings.push({
  //         userID:userID,rating:rating
  //       })
  //     }
  //   }

  // }


}

var products = [
  new productModel(
    1,
    "Cotton tiger print",
    "Very beautiful fabric with tiger color print",
    "https://www.bing.com/th?id=OIP.2kBM_Mmzf9spe-ZBLAbJhAHaJQ&w=150&h=188&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    "Shirt",
    599,
    ["S", "L", "XL"]
  ),
  new productModel(
    2,
    "Wolfpack",
    "Women Camel Brown Tiger Graphic Printed",
    "https://www.bing.com/th?id=OPAC.sYHgC4LnRsn9rg474C474&o=5&pid=21.1&w=136&h=136&rs=1&qlt=100&dpr=1.3",
    "T-shirt",
    999,
    ["M", "L"]
  ),
  new productModel(
    3,
    "Huetrap",
    "Men Red Tiger Print Round Neck T-shirt",
    "https://www.bing.com/th?id=OPAC.X6MkA16osTGgOA474C474&o=5&pid=21.1&w=136&h=136&rs=1&qlt=100&dpr=1.3",
    "T-shirt",
    799,
    ["L", "M", "XL"]
  ),
];

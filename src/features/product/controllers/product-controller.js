import pm from "../models/product-model.js";

export default class productController {
  
  addProduct(req, res) {
    console.log(req.body);
    const { name, desc, category, price, sizes } = req.body;
    const newProduct = {
      name,
      desc,
      image: req.file.filename,
      category,
      price: parseFloat(price),
      sizes: sizes.split(","),
    };
    pm.addProduct(newProduct);
    let products = pm.getProducts();
    res.status(201).send("Product Added" + JSON.stringify(products));
    console.log("Add Product API Hit");
  }

  getAllProducts(req, res) {
    var products = JSON.stringify(pm.getProducts());
    res.setHeader("content-type", "application/json");
    res.status(200).send(products);
    console.log("Get All Product API Hit");
  }

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = pm.singleProduct(id);
    if (!product) {
      res.status(404).send("Prodct not found");
    } else {
      res.status(200);
      res.send(product);
      console.log("Get One Product API Hit");
    }
  }

  getFilteredProduct(req, res) {
    // using query parameter -> /api/product/getFilterProduct?minPrice=10&maxPrice=100&cateogory=category
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const sizes = req.query.sizes;
    const sizesArray = sizes ? sizes.split(",") : undefined;
    const result = pm.filter(minPrice, maxPrice, category, sizesArray);
    if (!result) {
      res.status(404).send("No Product Found");
    } else {
      res.status(200).send(result);
    }
  }

  rateProduct(req, res) {}
}

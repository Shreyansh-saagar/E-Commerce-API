import { applicationError } from "../../errors/applicationError.js";
import productRepository from "../Repository/product.repository.js";
import productModel from "../models/product-model.js";
import pm from "../models/product-model.js";

export default class productController {
  constructor(){
    this.productRepo = new productRepository
  }
  
  async addProduct(req, res) {
    console.log(req.body);

    try{
      const { name, desc, category, price, sizes } = req.body;
      const newProduct = new productModel(
        name,
        desc,
        req.file.filename,
        category,
        parseFloat(price),
        sizes.split(","),
      );

      const result = await this.productRepo.add(newProduct);
      res.status(201).send("Product Added" + JSON.stringify(result));
    }catch(e){
      throw new applicationError('Something went wrong',500)
    }

    console.log("Add Product API Hit");
  }

  async getAllProducts(req, res) {
    try {
      var products = JSON.stringify(await this.productRepo.getAll());
      res.setHeader("content-type", "application/json");
      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      throw new applicationError('Something went wrong',500)
    }
    console.log("Get All Product API Hit");
  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepo.getOne(id);
      if (!product) {
        res.status(404).send("Prodct not found");
      } else {
        res.status(200);
        res.send(product);
      }
    } catch (error) {
      throw new applicationError('Something went wrong',500)
    }
    console.log("Get One Product API Hit");
  }

  async getFilteredProduct(req, res) {
    // using query parameter -> /api/product/getFilterProduct?minPrice=10&maxPrice=100&cateogory=category
    try {
      const minPrice = req.query.minPrice;
      const maxPrice = req.query.maxPrice;
      const category = req.query.category;
      const result = await this.productRepo.filter(minPrice, maxPrice, category);
      if (!result) {
        res.status(404).send("No Product Found");
      } else {
        res.status(200).send(result);
      }
    } catch (error) {
      throw new applicationError('Something went wrong',500)
    }
  }

  rateProduct(req, res, next) {
    const userID = req.userId;
    const productID = req.query.productID;
    const rating = req.query.rating;
    try {
      this.productRepo.rate(userID, productID, rating)
      return res.status(200).send('Rating Added Successfully');
    } catch (error) {
      console.log("passing error to middleware");
      next(error);
    }

  }
}

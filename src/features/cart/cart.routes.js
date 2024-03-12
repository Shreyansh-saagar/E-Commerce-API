//to manage paths of product controller
// 1. import express
// 2. initialize express router

import express from "express";
import {cartController} from "./controllers/cart.controller.js";

const cartrouter = express.Router();
const cc = new cartController()

cartrouter.post('/',(req,res)=>{
    cc.add(req,res)
})
cartrouter.get('/',(req,res)=>{
    cc.toGetCart(req,res)
})
cartrouter.delete('/:id',(req,res)=>{
    cc.delete(req,res)
})


export default cartrouter

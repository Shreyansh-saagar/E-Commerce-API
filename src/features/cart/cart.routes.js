//to manage paths of product controller
// 1. import express
// 2. initialize express router

import express from "express";
import {cartController} from "./controllers/cart.controller.js";

const cartrouter = express.Router();
const cc = new cartController()

cartrouter.post('/',cc.add)
cartrouter.get('/',cc.toGetCart)


export default cartrouter

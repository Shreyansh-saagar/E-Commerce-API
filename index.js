import swagger from 'swagger-ui-express'

import express from 'express';
import bodyParser from 'body-parser';



import productRouter from './src/features/product/product-routes.js';
import userrouter from './src/features/user/user-routes.js';
import basicAuth from './src/middlewares/basic-auth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartrouter from './src/features/cart/cart.routes.js';
import apidocs from './swagger.json' assert {type:'json'}


const PORT = '5100';
const app = express();

// Application level middlewares
app.use(bodyParser.json())

// MANAGING ROUTES

// -> API DOC ROUTE
app.use('/api-docs', swagger.serve, swagger.setup(apidocs))

// -> API ROUTES

app.use('/api/products', jwtAuth ,productRouter)
app.use('/api/users',userrouter)
app.use('/api/cart', jwtAuth, cartrouter)


app.get('/', (req, res) => {
    res.send("Welcome to E-com API")
})

app.listen(PORT,()=>{
    console.log(`App listening on port: ${PORT}`);
})
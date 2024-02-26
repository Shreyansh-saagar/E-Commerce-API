import swagger from 'swagger-ui-express'

import express from 'express';
import bodyParser from 'body-parser';



import productRouter from './src/features/product/product-routes.js';
import userrouter from './src/features/user/user-routes.js';
import basicAuth from './src/middlewares/basic-auth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cartrouter from './src/features/cart/cart.routes.js';
import apidocs from './swagger.json' assert {type:'json'}
import cors from 'cors'
import loggerMiddleware from './src/middlewares/logger.middleware.js';

const PORT = '5100';
const app = express();


// Handling CORS manually config -> * to allow eveything else to restrict you can specify it by seprating with ','
/* app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers','*')
    res.header('Access-Control-Allow-Methods', '*')

    if(req.method == "OPTIONS"){
        return res.sendStatus(200)
    }

    next()
}) */


// Handling CORS using library
app.use(cors())


// Application level middlewares
app.use(bodyParser.json())

// MANAGING ROUTES

// -> API DOC ROUTE
app.use('/api-docs', swagger.serve, swagger.setup(apidocs))

// -> API ROUTES

app.use('/api/products', loggerMiddleware,jwtAuth ,productRouter)
app.use('/api/users',userrouter)
app.use('/api/cart', loggerMiddleware,jwtAuth, cartrouter)


app.get('/', (req, res) => {
    res.send("Welcome to E-com API")
})

// Middleware to handle all the requests which doesn't exist to handle 404
// always keep it in end
app.use((req,res)=>{
    res.status(404).send("API not found")
})


app.listen(PORT,()=>{
    console.log(`App listening on port: ${PORT}`);
})
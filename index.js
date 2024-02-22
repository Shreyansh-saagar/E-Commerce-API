import express from 'express';
import bodyParser from 'body-parser';

import productRouter from './src/features/product/product-routes.js';
import userrouter from './src/features/user/user-routes.js';
import basicAuth from './src/middlewares/basic-auth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';

const PORT = '5100';
const app = express();

// Application level middlewares
app.use(bodyParser.json())

// MANAGING ROUTES
app.use('/api/products', jwtAuth ,productRouter)
app.use('/api/users',userrouter)


app.get('/', (req, res) => {
    res.send("Welcome to E-com API")
})

app.listen(PORT,()=>{
    console.log(`App listening on port: ${PORT}`);
})
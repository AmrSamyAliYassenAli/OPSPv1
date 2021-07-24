// Import Packages
import cors from 'cors';
import {json} from "body-parser";
import express from 'express';
import consola from "consola";
import {join} from "path";
import passport from "passport";

const DBConnection = require('./Database/Connection.DB');
// Import Application Constants
import { PORT,DB } from './Infrastructure/Constants';
// Router Import
import userApis from './Api/Routes/User/User.Routes';
import pharmacyApis from './Api/Routes/Pharmacy/Pharmacy.Routes';
import productApis from './Api/Routes/Pruduct/Product.Routes';
import pharmacyProduct from './Api/Routes/Pharmacy/PharmacyProduct.Routes';

// Import passport Middelware
require('./Infrastructure/Middlewares/passport.middleware');
// Initialize express applicaion
const app = express();

// Apply Application Middlewares
app.use(cors());
app.use(json());
app.use(passport.initialize());
app.use(express.static(join(__dirname, '../Uploads')));

// Inject Sub Router and apis
app.use('/users',userApis);
app.use('/pharmacy',pharmacyApis);
app.use('/product',productApis);
app.use('/parmacyproduct',pharmacyProduct);

// Implement Main startUp Function
const main = async()=>{
    try {
        // connect to database
        DBConnection(DB);
        // start application start listening for request server
        app.listen(PORT,()=>{
            consola.success(`Server Listening on Port ${PORT}...`);
        });
    } catch (error) {
        consola.error(new Error(`Unable to start the server \n${error.message}`));
    }
};

main();
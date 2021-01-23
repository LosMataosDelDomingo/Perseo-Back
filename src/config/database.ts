// ** Mongoose Configuration file **

import mongoose from "mongoose";
import config from "../constants/env";
import { DATABASE_OPEN_LOG } from './../constants/logs';

// Mongoose config options for connection
const mongooseOptions: mongoose.ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
}

// Mongoose connection
mongoose.connect(config.DB.URI, mongooseOptions);
const connection = mongoose.connection;


// Mongoose event handlers
connection.once("open", () => console.log(DATABASE_OPEN_LOG));

connection.on('error', err => {
    console.log(err);
    process.exit(0);
});
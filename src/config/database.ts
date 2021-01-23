import mongoose from "mongoose";
import config from "../constants/env";


const mongooseOptions: mongoose.ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true
}

mongoose.connect(config.DB.URI, mongooseOptions);
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Mongo connection stablished");  
});

connection.on('error', err => {
    console.log(err);
    process.exit(0);
});
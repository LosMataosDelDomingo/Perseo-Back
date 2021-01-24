// ** Init file **
 import dotenv from "dotenv"
 dotenv.config()
import app from './config/app';
import "./config/database";

app.listen(app.get('port'));

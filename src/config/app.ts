import express from "express";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "../routes/api/user.routes";
// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use("/api", userRoutes)

export default app;
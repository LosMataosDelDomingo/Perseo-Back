// ** Server Configuration file **

import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import passportMiddleware from "../config/passport"

import apiRoutes from "../routes/api/api.routes";
import authRoutes from "../routes/api/auth/auth.routes";
import protectedRoutes from "../routes/api/admin/admin.routes"

// Initializations
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);

// Routes
app.use("/api", apiRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/admin", protectedRoutes)

export default app;
// ** Enviroment variables **

export default {
    jwtSecret: process.env.JWT_SECRET || "randomtoken",
    DB: {
        URI: process.env.MONGODB_URI || "mongodb://localhost/apinuwe",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}
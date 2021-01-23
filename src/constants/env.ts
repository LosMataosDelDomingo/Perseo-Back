// ** Enviroment variables **

export default {
    jwtSecret: process.env.JWT_SECRET || "randomtoken",
    DB: {
        URI: "mongodb+srv://ErixMV:Familia@perseocluster.gakol.mongodb.net/PerseoDB?retryWrites=true&w=majority",
        USER: process.env.MONGODB_USER,
        PASSWORD: process.env.MONGODB_PASSWORD
    }
}
// ** Enviroment variables **

export default {
    jwtSecret: process.env.JWT_SECRET || "randomtoken",
    DB: {
        URI: `mongodb+srv://ErixMV:Familia@perseocluster.gakol.mongodb.net/PerseoDB?retryWrites=true&w=majority`,
        // URI: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@perseocluster.gakol.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
        USER: process.env.MONGODB_USER || "root",
        PASSWORD: process.env.MONGODB_PASSWORD || "pwd"
    }
}
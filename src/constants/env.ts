// ** Enviroment variables **

export default {
    jwtSecret: process.env.JWT_SECRET || "randomtoken",
    DB: {
        URI: `mongodb+srv://${process.env.DBNAME}:${process.env.DBUSER}@perseocluster.gakol.mongodb.net/${process.env.DBPASSWORD}?retryWrites=true&w=majority`,
        USER: process.env.MONGODB_USER || "root",
        PASSWORD: process.env.MONGODB_PASSWORD || "pwd"
    }
}
// ** Enviroment variables **

export default {
    JWT_SECRET: process.env.JWT_SECRET || "randomtoken",
    DB: {
        URI: `mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@perseocluster.gakol.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`,
    }
}
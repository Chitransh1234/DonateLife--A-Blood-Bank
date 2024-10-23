const mongoose = require("mongoose");
const colors =require("colors");
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL
            // useNewUrlParser:true,
            // useUnifiedTopology:true,
            // useCreateIndex:true,
            // useFindAndModify:false
        );
        console.log(`Connceted to Mongodb Database ${mongoose.connection.host}`.bgMagenta.white);
    } catch(error){
        console.log(`Mongodb database Error: ${error}`.bgRed.white);
        // process.exit(1);
    }
}

module.exports={connectDB};
import consola from "consola";
import Mongoose from "mongoose";

const DBConnection = async(DB)=>{
    try {
        await Mongoose.connect(DB,{
            useCreateIndex:true,
            useFindAndModify:false,
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        consola.success(`Database Connected...`);
        consola.info(`Database Connected on ${DB}`);
    } catch (error) {
        consola.error(new Error(`#Database Connection Faild! ${error.message}`));
    }
};

module.exports=DBConnection;
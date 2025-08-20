import mongoose from "mongoose";

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI|| "mongodb://localhost:27017/loopwar")
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(error){
        console.error(`Error connection to mongoDB: ${error.message}`);
        process.exit(1);
    }
}

export default connectMongoDB
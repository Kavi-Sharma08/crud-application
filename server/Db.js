import mongoose, { mongo } from "mongoose";

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connected DB")
    } catch (error) {
        
    }
}

export default connectDB;
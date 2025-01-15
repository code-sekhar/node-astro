import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
    try {
        const uri = 'mongodb+srv://sekharchaudhary5:12345@cluster0.1prdp.mongodb.net/crudTs'
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {   
        console.error("Error connecting to MongoDB:", error);
    }
};
export default connectDB;
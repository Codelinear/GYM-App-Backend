import mongoose from "mongoose";

export const connectDatabse = async () => {
  try {
    // await mongoose.connect("mongodb://localhost:27017/userdb");
    await mongoose.connect(
      "mongodb+srv://gym:gympassword@cluster0.skhn7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("DataBase Connect successfully!");
  } catch (error) {
    console.log(error.message);
  }
};

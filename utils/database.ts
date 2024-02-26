import mongoose, { ConnectOptions }from "mongoose";

let isConnected = false;
export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Mongodb is already connected");
    return;
  }
  try {
    
    await mongoose.connect(process.env.MONGODB_URI || "", {
      useNewUrlParser:true,
      useUnifiedTopology:true 
    } as ConnectOptions) 
    isConnected = true;
    console.log("MongoDB connected");
  } catch (e) {
    console.log("Error while connecting to the database", e);
  }
};

import mongoose from "mongoose";

const connectToMongo = async () => {
  const res = await mongoose.connect(
    "mongodb+srv://backend:suraj123@cluster1.8noex.mongodb.net/blog",
  );
  if (res) {
    console.log("Database connected");
  }
};

export default connectToMongo;

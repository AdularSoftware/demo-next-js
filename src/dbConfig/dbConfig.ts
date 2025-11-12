import mongoose from "mongoose";

let isConnected = false;

export async function connect() {
  if (isConnected) {
    console.log("Using existing database connection");
    return;
  }

  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not set");
    }

    await mongoose.connect(mongoUrl);
    isConnected = true;
    console.log("MongoDB connected");

    const db = mongoose.connection;
    db.on("connected", () => {
      console.log("Mongoose connected to DB successfully");
    });

    db.on("error", (err) => {
      console.error("Mongoose connection error:", err);
      isConnected = false;
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error;
  }
}

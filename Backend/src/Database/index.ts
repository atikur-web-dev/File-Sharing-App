import mongoose from "mongoose";
import { config } from "../Config/config.ts";

export async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log("Mongoose connect to MongoDB Atlas");
  });

  mongoose.connection.on("error", (err: Error) => {
    console.error("Mongoose Connection Failed : ", err);
    process.exit(1);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose disconnected from MongoDB");
  });

  try {
    await mongoose.connect(config.DATABASE_URL);
    console.log("Database Connection Established");
  } catch (error) {
    console.error("Failed to connect to Database", error);
    process.exit(1);
  }
}

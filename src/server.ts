import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./configs/Db";

const PORT = process.env.PORT || 5002;

const start = async (): Promise<void> => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Orders service running on port ${PORT}`);
  });
};

start();
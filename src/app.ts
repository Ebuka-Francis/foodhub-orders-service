import express, { Application } from "express";
import cors from "cors";
import orderRoutes from "./routes/Orderroutes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/api/orders", orderRoutes);

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "orders-service" });
});

export default app;
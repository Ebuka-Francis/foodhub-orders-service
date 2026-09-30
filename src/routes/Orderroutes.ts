import { Router } from "express";
import {
  createOrder,
  getOrdersByUser,
  getOrderById,
  updateOrderStatus,
} from "../controllers/Ordercontroller";


const router = Router();

router.post("/", createOrder);
router.get("/user/:userId", getOrdersByUser);
router.get("/:id", getOrderById);
router.put("/:id/status", updateOrderStatus);

export default router;
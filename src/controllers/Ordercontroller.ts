import { Request, Response } from "express";
import { Order, IOrderItem } from "../models/Order";

// POST /orders
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, items, deliveryAddress } = req.body as {
      userId: string;
      items: IOrderItem[];
      deliveryAddress: string;
    };

    if (!userId || !items?.length || !deliveryAddress) {
      res.status(400).json({ message: "userId, items and deliveryAddress are required" });
      return;
    }

    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const order = await Order.create({ userId, items, totalAmount, deliveryAddress });
    res.status(201).json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to create order", error: (err as Error).message });
  }
};

// GET /orders/user/:userId
export const getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// GET /orders/:id
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// PUT /orders/:id/status
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.status(200).json({ order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update order status", error: (err as Error).message });
  }
};
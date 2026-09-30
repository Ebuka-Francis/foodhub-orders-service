import { Schema, model, Document } from "mongoose";

export type OrderStatus = "pending" | "confirmed" | "preparing" | "delivered" | "cancelled";

// Snapshot of a meal at the time it was ordered — protects order history
// even if the meal's price/name/image changes or is deleted later.
export interface IOrderItem {
  mealId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface IOrder extends Document {
  userId: string;
  items: IOrderItem[];
  totalAmount: number;
  status: OrderStatus;
  deliveryAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    mealId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    totalAmount: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "delivered", "cancelled"],
      default: "pending",
    },
    deliveryAddress: { type: String, required: true },
  },
  { timestamps: true }
);

export const Order = model<IOrder>("Order", orderSchema);
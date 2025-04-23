import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

interface IAddress {
  village: string;
  landmark: string;
  nearestCity: string;
  pincode: string;
}

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  orderItems: IOrderItem[];
  address: IAddress;
  totalAmount: number;
  shippingCharge: number;
  paymentMethod: 'COD' | 'UPI' | 'CARD';
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED';
  status: 'PLACED' | 'CONFIRMED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  deliveryAgent?: mongoose.Types.ObjectId;
  estimatedDeliveryDate: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  cancelReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema: Schema = new Schema({
  product: { 
    type: Schema.Types.ObjectId, 
    ref: 'Product',
    required: true
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true }
});

const AddressSchema: Schema = new Schema({
  village: { type: String, required: true },
  landmark: { type: String, required: true },
  nearestCity: { type: String, required: true },
  pincode: { type: String, required: true }
});

const OrderSchema: Schema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    orderItems: [OrderItemSchema],
    address: { 
      type: AddressSchema,
      required: true
    },
    totalAmount: { type: Number, required: true },
    shippingCharge: { type: Number, required: true },
    paymentMethod: { 
      type: String, 
      enum: ['COD', 'UPI', 'CARD'],
      required: true
    },
    paymentStatus: { 
      type: String, 
      enum: ['PENDING', 'PAID', 'FAILED'],
      default: 'PENDING'
    },
    status: { 
      type: String, 
      enum: ['PLACED', 'CONFIRMED', 'SHIPPED', 'OUT_FOR_DELIVERY', 'DELIVERED', 'CANCELLED'],
      default: 'PLACED'
    },
    deliveryAgent: { 
      type: Schema.Types.ObjectId, 
      ref: 'User'
    },
    estimatedDeliveryDate: { type: Date, required: true },
    deliveredAt: { type: Date },
    cancelledAt: { type: Date },
    cancelReason: { type: String }
  },
  { timestamps: true }
);

// Create index for faster queries
OrderSchema.index({ user: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ 'address.pincode': 1 });
OrderSchema.index({ createdAt: 1 });

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema); 
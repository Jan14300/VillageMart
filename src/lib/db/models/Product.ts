import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  inStock: boolean;
  stockQuantity: number;
  features: {
    en: string[];
  };
  specifications: Record<string, string>;
  ratings: {
    average: number;
    count: number;
  };
  deliveryAreas: string[]; // PIN codes where delivery is available
  estimatedDeliveryDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true }
    },
    description: {
      en: { type: String, required: true }
    },
    price: { type: Number, required: true },
    discountPrice: { type: Number },
    images: { type: [String], required: true },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true 
    },
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, required: true },
    features: {
      en: { type: [String] }
    },
    specifications: { type: Map, of: String },
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 }
    },
    deliveryAreas: { type: [String] },
    estimatedDeliveryDays: { type: Number, default: 7 }
  },
  { timestamps: true }
);

// Create full-text search index for product search
ProductSchema.index({ 'name.en': 'text', 'description.en': 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema); 
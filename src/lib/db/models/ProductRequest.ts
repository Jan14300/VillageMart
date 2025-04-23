import mongoose, { Schema, Document } from 'mongoose';

export interface IProductRequest extends Document {
  user: mongoose.Types.ObjectId;
  productName: string;
  description: string;
  price?: number;
  category?: mongoose.Types.ObjectId;
  imageUrl?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ADDED';
  adminNote?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductRequestSchema: Schema = new Schema(
  {
    user: { 
      type: Schema.Types.ObjectId, 
      ref: 'User',
      required: true
    },
    productName: { 
      type: String, 
      required: true 
    },
    description: { 
      type: String, 
      required: true 
    },
    price: { 
      type: Number 
    },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: 'Category'
    },
    imageUrl: { 
      type: String 
    },
    status: { 
      type: String, 
      enum: ['PENDING', 'APPROVED', 'REJECTED', 'ADDED'],
      default: 'PENDING'
    },
    adminNote: { 
      type: String 
    }
  },
  { timestamps: true }
);

// Create index for faster queries
ProductRequestSchema.index({ user: 1 });
ProductRequestSchema.index({ status: 1 });
ProductRequestSchema.index({ createdAt: 1 });

export default mongoose.models.ProductRequest || mongoose.model<IProductRequest>('ProductRequest', ProductRequestSchema); 
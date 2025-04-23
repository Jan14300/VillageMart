import mongoose, { Schema, Document } from 'mongoose';

interface IAddress {
  village: string;
  landmark: string;
  nearestCity: string;
  pincode: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  name: string;
  phone: string;
  email?: string;
  password?: string;
  addresses: IAddress[];
  role: 'user' | 'admin' | 'delivery';
  preferredLanguage: 'en';
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema: Schema = new Schema({
  village: { type: String, required: true },
  landmark: { type: String, required: true },
  nearestCity: { type: String, required: true },
  pincode: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
});

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, sparse: true },
    password: { type: String },
    addresses: [AddressSchema],
    role: { 
      type: String, 
      enum: ['user', 'admin', 'delivery'], 
      default: 'user' 
    },
    preferredLanguage: { 
      type: String, 
      enum: ['en'], 
      default: 'en' 
    },
    lastLogin: { type: Date }
  },
  { timestamps: true }
);

// Create index for faster lookup and searching
UserSchema.index({ phone: 1 });
UserSchema.index({ email: 1 });
UserSchema.index({ 'addresses.pincode': 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 
import mongoose, { Schema, Document } from 'mongoose';

export interface IDeliveryZone extends Document {
  pincode: string;
  villageName: {
    en: string;
  };
  district: {
    en: string;
  };
  state: {
    en: string;
  };
  isServiceable: boolean;
  deliveryDays: number;
  deliveryCharge: number;
  minimumOrderValue: number;
  freeDeliveryThreshold: number;
  createdAt: Date;
  updatedAt: Date;
}

const DeliveryZoneSchema: Schema = new Schema(
  {
    pincode: { 
      type: String, 
      required: true,
      unique: true 
    },
    villageName: {
      en: { type: String, required: true }
    },
    district: {
      en: { type: String, required: true }
    },
    state: {
      en: { type: String, required: true }
    },
    isServiceable: { 
      type: Boolean, 
      default: true 
    },
    deliveryDays: { 
      type: Number, 
      required: true,
      default: 7 
    },
    deliveryCharge: { 
      type: Number, 
      required: true,
      default: 50 
    },
    minimumOrderValue: { 
      type: Number, 
      required: true,
      default: 299 
    },
    freeDeliveryThreshold: { 
      type: Number, 
      required: true,
      default: 999
    }
  },
  { timestamps: true }
);

// Create index for faster lookup
DeliveryZoneSchema.index({ pincode: 1 });
DeliveryZoneSchema.index({ 'villageName.en': 'text' });
DeliveryZoneSchema.index({ isServiceable: 1 });

export default mongoose.models.DeliveryZone || mongoose.model<IDeliveryZone>('DeliveryZone', DeliveryZoneSchema); 
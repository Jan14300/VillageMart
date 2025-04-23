import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: {
    en: string;
  };
  slug: string;
  image: string;
  parentCategory?: mongoose.Types.ObjectId;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
  {
    name: {
      en: { type: String, required: true }
    },
    slug: { type: String, required: true, unique: true },
    image: { type: String },
    parentCategory: { 
      type: Schema.Types.ObjectId, 
      ref: 'Category' 
    },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

// Create index for faster lookup
CategorySchema.index({ slug: 1 });
CategorySchema.index({ 'name.en': 'text' });

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema); 
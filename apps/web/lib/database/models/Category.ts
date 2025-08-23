import { model, models, Schema, type Types } from 'mongoose';

export type CategoryModel = {
  _id: Types.ObjectId;
  spaceId: string;
  billboardId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

const MAX_NAME_LENGTH = 70;

const CategorySchema = new Schema<CategoryModel>(
  {
    spaceId: {
      type: String,
      required: [true, 'Please provide a spaceId for this Category'],
      index: true,
    },
    billboardId: {
      type: String,
      required: [true, 'Please provide a billboardId for this Category'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Please provide a name for this Category'],
      maxlength: [MAX_NAME_LENGTH, 'Name cannot be more than 70 characters'],
      trim: true,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  }
);

// Add compound index for better query performance
CategorySchema.index({ spaceId: 1, name: 1 }, { unique: true });

export default models.Category ||
  model<CategoryModel>('Category', CategorySchema);

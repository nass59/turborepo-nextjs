import { model, models, Schema, type Types } from 'mongoose';

export type ItemModel = {
  _id: Types.ObjectId;
  spaceId: string;
  name: string;
  categoryId: string;
  category: string;
  images: string[];
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const MAX_NAME_LENGTH = 70;

const ItemSchema = new Schema<ItemModel>({
  spaceId: {
    type: String,
    required: [true, 'Please provide a spaceId for this Item'],
  },
  name: {
    type: String,
    required: [true, 'Please provide a name for this Item'],
    maxlength: [MAX_NAME_LENGTH, 'Name cannot be more than 70 characters'],
  },
  categoryId: {
    type: String,
    required: [true, 'Please provide a category for this Item'],
  },
  images: {
    type: [String],
    default: [],
    required: [true, 'Please provide one or multiple images for this Item'],
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isArchived: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Item || model<ItemModel>('Item', ItemSchema);

import { Schema, model, models, type Types } from "mongoose"

export type CategoryModel = {
  _id: Types.ObjectId
  spaceId: string
  billboardId: string
  name: string
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<CategoryModel>({
  spaceId: {
    type: String,
    required: [true, "Please provide a spaceId for this Category"],
  },
  billboardId: {
    type: String,
    required: [true, "Please provide a billboardId for this Category"],
  },
  name: {
    type: String,
    required: [true, "Please provide a name for this Category"],
    maxlength: [70, "Name cannot be more than 70 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default models.Category ||
  model<CategoryModel>("Category", CategorySchema)

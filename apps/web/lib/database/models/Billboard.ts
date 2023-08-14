import { Schema, model, models, type Types } from "mongoose"

export type BillboardModel = {
  _id: Types.ObjectId
  spaceId: string
  label: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

const BillboardSchema = new Schema<BillboardModel>({
  spaceId: {
    type: String,
    required: [true, "Please provide a spaceId for this Billboard"],
  },
  label: {
    type: String,
    required: [true, "Please provide a label for this Billboard"],
    maxlength: [70, "Label cannot be more than 70 characters"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an imageUrl for this Billboard"],
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

export default models.Billboard ||
  model<BillboardModel>("Billboard", BillboardSchema)

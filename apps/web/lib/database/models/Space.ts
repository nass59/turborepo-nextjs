import { Schema, model, models, type Types } from "mongoose"

export type SpaceModel = {
  _id: Types.ObjectId
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

const SpaceSchema = new Schema<SpaceModel>({
  name: {
    type: String,
    required: [true, "Please provide a name for this space"],
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  userId: {
    type: String,
    required: [true, "Please provide a userId for this space"],
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

export default models.Space || model<SpaceModel>("Space", SpaceSchema)

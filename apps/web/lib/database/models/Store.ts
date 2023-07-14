import { Schema, model, models, type Types } from "mongoose"

export type StoreModel = {
  _id: Types.ObjectId
  name: string
  userId: string
  createdAt: Date
  updatedAt: Date
}

const StoreSchema = new Schema<StoreModel>({
  name: {
    type: String,
    required: [true, "Please provide a name for this store"],
    maxlength: [30, "Name cannot be more than 30 characters"],
  },
  userId: {
    type: String,
    required: [true, "Please provide a userId for this store"],
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

export default models.Store || model<StoreModel>("Store", StoreSchema)

import { model, models, Schema, type Types } from "mongoose"

export type CourseModel = {
  _id: Types.ObjectId
  spaceId: string
  title: string
  imageUrl: string
  createdAt: Date
  updatedAt: Date
}

const CourseSchema = new Schema<CourseModel>({
  spaceId: {
    type: String,
    required: [true, "Please provide a spaceId for this Course"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title for this Course"],
    maxlength: [70, "Label cannot be more than 70 characters"],
  },
  imageUrl: {
    type: String,
    required: [true, "Please provide an imageUrl for this Course"],
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

export default models.Course || model<CourseModel>("Course", CourseSchema)

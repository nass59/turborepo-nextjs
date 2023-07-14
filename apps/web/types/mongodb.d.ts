import type _mongoose from "mongoose"
import { type connect } from "mongoose"

declare global {
  var mongoose: {
    promise: ReturnType<typeof connect> | null
    conn: typeof _mongoose | null
  }
}
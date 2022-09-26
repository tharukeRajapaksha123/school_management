import mongoose, { Schema } from "mongoose"

export interface IRoom {
   type: string,
   cost_per_day: number,
   num_of_beds: number,
   facilities: string,
   image: string
}

export interface IRoomModel extends IRoom, Document { }

const RoomSchema: Schema = new Schema(
   {
      type: { type: String, required: true },
      cost_per_day: { type: Number, required: true },
      num_of_beds: { type: Number, required: true },
      facilities: { type: String, required: true },
      image: { type: String, required: true },
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<IRoomModel>("Room", RoomSchema)
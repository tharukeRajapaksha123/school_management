import mongoose, { Schema } from "mongoose"

export interface IWedding {
   customer_id: string,
   wedding_location: string,
   num_of_guests: number,
   date: string

}

export interface IWeddingModel extends IWedding, Document { }

const WeddingSchema: Schema = new Schema(
   {
      customer_id: { type: String, required: true },
      wedding_location: { type: String, required: true },
      num_of_guests: { type: String, required: true },
      date: { type: String, required: true }
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<IWeddingModel>("Wedding", WeddingSchema)
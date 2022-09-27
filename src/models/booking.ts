import mongoose, { Schema } from "mongoose"

export interface IBooking {
   customer_name: string,
   customer_address: string,
   customer_id: string,
   vehicle_id: string,
   with_driver: number

}

export interface IBookingModel extends IBooking, Document { }

const BookingSchema: Schema = new Schema(
   {
      customer_name: { type: String, required: true },
      customer_address: { type: String, required: true },
      customer_id: { type: String, required: true },
      vehicle_id: { type: String, required: true },
      with_driver: { type: Number, required: true },
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<IBookingModel>("Booking", BookingSchema)
import mongoose, { Schema } from "mongoose"

export interface IReservation {
   customer_name: string,
   date: Date,
   customer_id: string,
   num_of_chairs: Number
}

export interface IReservationModel extends IReservation, Document { }

const ReservationSchema: Schema = new Schema(
   {
      customer_name: { type: String, required: true },
      customer_id: { type: String, required: true },
      date: { type: Date, default: null, required: true },
      num_of_chairs: { type: Number, required: true }
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<IReservationModel>("Reservation", ReservationSchema)
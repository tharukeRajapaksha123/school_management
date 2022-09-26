import mongoose, { Schema } from "mongoose"

export interface ITransportTour {
   vehicle_id: string,
   customer_id: string,
   date: Date,
   employee_id: string
}

export interface ITransportTourModel extends ITransportTour, Document { }

const TransportTourSchema: Schema = new Schema(
   {
      vehicle_id: { type: String, required: true },
      customer_id: { type: String, required: true },
      date: { type: Date, required: true },
      employee_id: { type: String, required: false }
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<ITransportTourModel>("TransportTour", TransportTourSchema)
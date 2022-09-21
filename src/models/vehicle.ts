import mongoose, { Schema } from "mongoose"

export interface IVehicle {
   brand: string,
   num_of_seats: number,
   registration_number: string,
}

export interface IVehicleModel extends IVehicle, Document { }

const VehicleSchema: Schema = new Schema(
   {
      brand: { type: String, required: true },
      num_of_seats: { type: Number, required: true },
      registration_number: { type: String, required: true },
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<IVehicleModel>("Vehicle", VehicleSchema)
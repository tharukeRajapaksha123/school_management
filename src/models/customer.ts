import mongoose, { Schema } from "mongoose"

export interface ICustomer {
   name: string,
   address: string,
   nic_number: string,

}

export interface ICustomerModel extends ICustomer, Document { }

const CustomerSchema: Schema = new Schema(
   {
      name: { type: String, required: true },
      address: { type: String, required: true },
      nic_number: { type: String, required: true },
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<ICustomerModel>("Customer", CustomerSchema)
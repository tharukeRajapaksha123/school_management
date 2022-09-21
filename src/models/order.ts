import mongoose, { Schema } from "mongoose"

export interface IOrder {
   customer_name: string,
   customer_id: string,
   address: string,
   price: number,
   type: string,
}

export interface IOrderModel extends IOrder, Document { }

const OrderSchema: Schema = new Schema(
   {
      customer_name: { type: String, required: true },
      type: { type: String, required: true },
      address: { type: String, required: true },
      customer_id: { type: String, required: true },
      price: { type: Number, required: true }
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<IOrderModel>("Order", OrderSchema)
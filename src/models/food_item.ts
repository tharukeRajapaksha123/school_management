import mongoose, { Schema } from "mongoose"

export interface IFoodItem {
   name: string,
   price: number,
   available: number
}

export interface IFoodItemModel extends IFoodItem, Document { }

const FoodItemSchema: Schema = new Schema(
   {
      name: { type: String, required: true },
      price: { type: Number, required: true },
      available: { type: Number, required: true }
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<IFoodItemModel>("FoodItem", FoodItemSchema)
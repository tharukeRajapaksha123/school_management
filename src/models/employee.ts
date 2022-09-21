import mongoose, { Schema } from "mongoose"

export interface IEmployee {
   name: string,
   age: string,
   address: string,
   salary: number,
   nic_number: string,
   transaction_date: Date,
}

export interface IEmployeeModel extends IEmployee, Document { }

const EmployeeSchema: Schema = new Schema(
   {
      name: { type: String, required: true },
      age: { type: String, required: true },
      address: { type: String, required: true },
      salary: { type: Number, required: true },
      nic_number: { type: String, required: true },
      transaction_date: { type: Date, default: null, required: true },
   }
   , {
      versionKey: false
   }
)

export default mongoose.model<IEmployeeModel>("Employee", EmployeeSchema)
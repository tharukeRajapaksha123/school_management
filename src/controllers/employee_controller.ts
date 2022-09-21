import { NextFunction, Router, Request, Response } from "express";
import Employee from "../models/employee";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-employee", (req: Request, res: Response, next: NextFunction) => {
   const { name, age, address, salary, nic_number } = req.body;
   const employee = new Employee(
      {
         _id: new mongoose.Types.ObjectId(),
         name,
         age,
         address,
         salary,
         nic_number,
         transaction_date: Date.now()
      }
   );
   return employee
      .save()
      .then((employee) => res.status(200).json({ employee }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return Employee.find()
      .then(employees => res.status(200).json({ employee_count: employees.length, employees }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Employee.findById(__id)
      .then((employee) => {
         if (employee) return res.status(200).json(employee)
         else return res.status(404).json({ message: "employee not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-employee/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Employee.findById(__id)
      .then((employee) => {
         if (employee) {
            employee.set(req.body);
            return employee
               .save()
               .then((employee) => {
                  return res.status(200).json({ employee });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "employee not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-employee/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Employee.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

export = router
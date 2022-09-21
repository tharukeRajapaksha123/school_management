import { NextFunction, Router, Request, Response } from "express";
import Vehicle from "../models/vehicle";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-vehicle", (req: Request, res: Response, next: NextFunction) => {
   const { brand, num_of_seats, registration_number } = req.body;
   const r = new Vehicle(
      {
         _id: new mongoose.Types.ObjectId(),
         brand,
         num_of_seats,
         registration_number
      }
   );
   return r
      .save()
      .then((Vehicle) => res.status(200).json({ Vehicle }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return Vehicle.find()
      .then(Vehicles => res.status(200).json({ Vehicle_count: Vehicles.length, Vehicles }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Vehicle.findById(__id)
      .then((Vehicle) => {
         if (Vehicle) return res.status(200).json(Vehicle)
         else return res.status(404).json({ message: "Vehicle not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-vehicle/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Vehicle.findById(__id)
      .then((Vehicle) => {
         if (Vehicle) {
            Vehicle.set(req.body);
            return Vehicle
               .save()
               .then((Vehicle) => {
                  return res.status(200).json({ Vehicle });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Vehicle not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-vehicle/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Vehicle.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

export = router
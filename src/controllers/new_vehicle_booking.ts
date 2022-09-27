import { NextFunction, Router, Request, Response } from "express";
import Booking from "../models/booking";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-vehicle-booking", (req: Request, res: Response, next: NextFunction) => {
   const { customer_name,
      customer_address,
      customer_id,
      vehicle_id,
      with_driver } = req.body;
   const r = new Booking(
      {
         _id: new mongoose.Types.ObjectId(),
         customer_name,
         date: Date.now(),
         customer_id,
         with_driver,
         vehicle_id,
         customer_address
      }
   );
   return r
      .save()
      .then((booking) => res.status(200).json({ booking }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return Booking.find()
      .then(bookings => res.status(200).json({ booking_count: bookings.length, bookings }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Booking.findById(__id)
      .then((booking) => {
         if (booking) return res.status(200).json(booking)
         else return res.status(404).json({ message: "Booking not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-vehicle-booking/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Booking.findById(__id)
      .then((booking) => {
         if (booking) {
            booking.set(req.body);
            return booking
               .save()
               .then((booking) => {
                  return res.status(200).json({ booking });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Booking not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-vehilce-booking/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Booking.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

export = router
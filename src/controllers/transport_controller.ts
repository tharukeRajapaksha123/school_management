import { NextFunction, Router, Request, Response } from "express";
import Transport_Tour from "../models/transport_tour";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-transport-tour", (req: Request, res: Response, next: NextFunction) => {
   const { vehicle_id, customer_id, employee_id } = req.body;
   const r = new Transport_Tour(
      {
         _id: new mongoose.Types.ObjectId(),
         vehicle_id,
         customer_id,
         date: Date.now(),
         employee_id
      }
   );
   return r
      .save()
      .then((Transport_Tour) => res.status(200).json({ Transport_Tour }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return Transport_Tour.find()
      .then(Transport_Tours => res.status(200).json({ Transport_Tour_count: Transport_Tours.length, Transport_Tours }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Transport_Tour.findById(__id)
      .then((Transport_Tour) => {
         if (Transport_Tour) return res.status(200).json(Transport_Tour)
         else return res.status(404).json({ message: "Transport_Tour not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-transport-tour/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Transport_Tour.findById(__id)
      .then((Transport_Tour) => {
         if (Transport_Tour) {
            Transport_Tour.set(req.body);
            return Transport_Tour
               .save()
               .then((Transport_Tour) => {
                  return res.status(200).json({ Transport_Tour });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Transport_Tour not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-transport-tour/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Transport_Tour.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

export = router
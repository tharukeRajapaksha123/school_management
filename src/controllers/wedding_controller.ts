import { NextFunction, Router, Request, Response } from "express";
import Wedding from "../models/wedding";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-wedding", (req: Request, res: Response, next: NextFunction) => {
   const { customer_id, wedding_location, num_of_guests, date } = req.body;
   const r = new Wedding(
      {
         _id: new mongoose.Types.ObjectId(),
         customer_id,
         wedding_location,
         num_of_guests,
         date,
      }
   );
   return r
      .save()
      .then((Wedding) => res.status(200).json({ Wedding }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return Wedding.find()
      .then(Weddings => res.status(200).json({ Wedding_count: Weddings.length, Weddings }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Wedding.findById(__id)
      .then((Wedding) => {
         if (Wedding) return res.status(200).json(Wedding)
         else return res.status(404).json({ message: "Wedding not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-wedding/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Wedding.findById(__id)
      .then((Wedding) => {
         if (Wedding) {
            Wedding.set(req.body);
            return Wedding
               .save()
               .then((Wedding) => {
                  return res.status(200).json({ Wedding });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Wedding not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-wedding/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Wedding.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

export = router
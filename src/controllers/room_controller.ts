import { NextFunction, Router, Request, Response } from "express";
import Room from "../models/room";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-room", (req: Request, res: Response, next: NextFunction) => {
   const { type, cost_per_day, num_of_beds, facilities, image } = req.body;
   const r = new Room(
      {
         _id: new mongoose.Types.ObjectId(),
         type,
         cost_per_day,
         num_of_beds,
         image,
         facilities
      }
   );
   return r
      .save()
      .then((Room) => res.status(200).json({ Room }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return Room.find()
      .then(Rooms => res.status(200).json({ Room_count: Rooms.length, Rooms }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Room.findById(__id)
      .then((Room) => {
         if (Room) return res.status(200).json(Room)
         else return res.status(404).json({ message: "Room not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-room/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Room.findById(__id)
      .then((Room) => {
         if (Room) {
            Room.set(req.body);
            return Room
               .save()
               .then((Room) => {
                  return res.status(200).json({ Room });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Room not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-room/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Room.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

export = router
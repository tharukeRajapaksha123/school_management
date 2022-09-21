import { NextFunction, Router, Request, Response } from "express";
import Order from "../models/order";
import mongoose from "mongoose";
const router = Router();


//create
router.post("/create-order", (req: Request, res: Response, next: NextFunction) => {
   const { customer_name, customer_id, address, price, type } = req.body;
   const r = new Order(
      {
         _id: new mongoose.Types.ObjectId(),
         customer_name,
         customer_id,
         address,
         price,
         type
      }
   );
   return r
      .save()
      .then((Order) => res.status(200).json({ Order }))
      .catch((error) => res.status(500).json({ error }));
})

//read
router.get("/", (req: Request, res: Response, nex: NextFunction) => {
   return Order.find()
      .then(Orders => res.status(200).json({ Order_count: Orders.length, Orders }))
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//read one
router.get("/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Order.findById(__id)
      .then((Order) => {
         if (Order) return res.status(200).json(Order)
         else return res.status(404).json({ message: "Order not found" })
      })
      .catch(err => res.status(500).json({ message: `${err}` }))
})

//update
router.put("/update-order/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Order.findById(__id)
      .then((Order) => {
         if (Order) {
            Order.set(req.body);
            return Order
               .save()
               .then((Order) => {
                  return res.status(200).json({ Order });
               })
               .catch((err) => {
                  return res.status(500).json({ err });
               });
         } else {
            return res.status(404).send({ error: "Order not found" });
         }
      })
      .catch((err) => {
         return res.status(500).json({ err });
      });
})

//delete
router.delete("/delete-order/:id", (req: Request, res: Response, nex: NextFunction) => {
   const __id = req.params.id;
   return Order.findByIdAndDelete(__id)
      .then(() => res.status(200).json({ success: true }))
      .catch((error) => res.status(500).json({ error }));
})

export = router
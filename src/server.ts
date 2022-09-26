import express from "express"
import http from "http"
import mongoose from "mongoose"
import Logging from "./library/Loggin"

const router = express()

/**constorllers */
const employ_controller = require("./controllers/employee_controller")
const reservation_controller = require("./controllers/reservation_controller")
const customer_controller = require("./controllers/customer_controller")
const food_controller = require("./controllers/food_controller")
const order_controller = require("./controllers/order_controller")
const vehicle_controller = require("./controllers/vehicle_controller")
const transport_controller = require("./controllers/transport_controller")
const wedding_controller = require("./controllers/wedding_controller")
const room_controller = require("./controllers/room_controller")


const db_url = "mongodb://db-itp:u9i7EW85Ez9N2fZRFvHOXTZG8B5jbX5zzMrAcM0ciTYbU11fKVXbOHKiVZzkiQr54Qe8X4XdPqwlDPekPANqFw%3D%3D@db-itp.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@db-itp@"
const port = 8080
/* Connect to Mongo */
mongoose.connect(db_url)
   .then(() => {
      Logging.info('Mongo connected successfully.');
      StartServer();
   })
   .catch(err => {
      Logging.error(err)
   })


/** Onli start if the server if Mongo connects  */

const StartServer = () => {
   router.use((req, res, next) => {
      /** Log the request */
      Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

      res.on('finish', () => {
         /** Log the res */
         Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
      });

      next(); /**allow to pass through the middleware to next tasks */
   })

   router.use(express.urlencoded({ extended: true }));
   router.use(express.json());

   /** Rules of our API */
   router.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

      if (req.method == 'OPTIONS') {
         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
         return res.status(200).json({});
      }

      next();
   });

   /** Routes */
   router.use("/employee-manager", employ_controller)
   router.use("/reservation_controller", reservation_controller)
   router.use("/customer-controller", customer_controller)
   router.use("/food-controller", food_controller)
   router.use("/order-controller", order_controller)
   router.use("/vehicle-controller", vehicle_controller)
   router.use("/transport-controller", transport_controller)
   router.use("/wedding-controller", wedding_controller)
   router.use("/room-controller", room_controller)

   /** Healthcheck */
   router.get('/ping', (req, res, next) => res.status(200).json({ hello: 'world' }));

   /** Error handling */
   router.use((req, res, next) => {
      const error = new Error('Not found');

      Logging.error(error);

      res.status(404).json({
         message: error.message
      });
   });

   http.createServer(router).listen(port, () => Logging.info(`Server is running on port ${port}`));
}
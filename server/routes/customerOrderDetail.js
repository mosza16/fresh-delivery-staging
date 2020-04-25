import "babel-polyfill";
import Router from "koa-router";
import { baseApi } from "../config";
import jwt from "../middlewares/jwt";
import CustomerOrderDetailControllers from "../controllers/customerOrderDetail";

const api = "customer-order-details";

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

router.get("/", jwt, CustomerOrderDetailControllers.find);

router.post("/", jwt, CustomerOrderDetailControllers.add);

router.get(
  "/bill-date/:billDate",
  jwt,
  CustomerOrderDetailControllers.findByDate
);

router.get("/:id", jwt, CustomerOrderDetailControllers.findById);

export default router;

import "babel-polyfill";
import Router from "koa-router";
import { baseApi } from "../config";
import authenticate from "../middlewares/authenticate";
import jwt from "../middlewares/jwt";

const api = "authenticate";

const router = new Router();

router.prefix(`/${baseApi}/${api}`);

// POST /api/authenticate
router.post("/", authenticate);

// GET /api/authenticate
router.get("/", jwt, (ctx) => {
  ctx.body = "ok";
});

export default router;

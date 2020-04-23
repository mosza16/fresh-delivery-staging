import CustomerOrderDetails from "../models/customerOrderDetails";

class CustomerOrderDetailControllers {
  /**
   * Get all cities
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await CustomerOrderDetails.find();
  }

  /**
   * Find a detail
   * @param {ctx} Koa Context
   */
  async findById(ctx) {
    try {
      const detail = await CustomerOrderDetails.findById(ctx.params.id);
      if (!detail) {
        ctx.throw(404);
      }
      ctx.body = detail;
    } catch (err) {
      if (err.name === "CastError" || err.name === "NotFoundError") {
        ctx.throw(404);
      }
      ctx.throw(500);
    }
  }

  /**
   * Add a detail
   * @param {ctx} Koa Context
   */
  async add(ctx) {
    try {
      const detail = await new CustomerOrderDetails(ctx.request.body).save();
      ctx.body = detail;
    } catch (err) {
      ctx.throw(422);
    }
  }
}

export default new CustomerOrderDetailControllers()
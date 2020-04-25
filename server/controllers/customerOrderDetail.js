import CustomerOrderDetails from "../models/customerOrderDetails";
import lineNotify from "../utils/lineNotify";

function lineNotifyMessageBuilder(orderDetail) {
  const message = `
  วันที่: ${orderDetail.billDate}
  บิลที่: ${orderDetail.billNo}
  ผู้รับ: ${orderDetail.name}
  ที่อยู่: ${orderDetail.addressInfo.address}
  แขวง/ตำบล: ${orderDetail.addressInfo.subdistrict}
  เขต/อำเภอ: ${orderDetail.addressInfo.district}
  จังหวัด: ${orderDetail.addressInfo.province}
  รหัสไปรษณีย์: ${orderDetail.addressInfo.postalCode}
  ข้อมูลสินค้า
  ${orderDetail.addressInfo.detail}
  ค่าส่ง ${orderDetail.addressInfo.deliveryCost}
  ${orderDetail.addressInfo.etc || ""}
  `;
  return message;
}
class CustomerOrderDetailControllers {
  /**
   * Get all cities
   * @param {ctx} Koa Context
   */
  async find(ctx) {
    ctx.body = await CustomerOrderDetails.find();
  }

  /**
   * Get all cities
   * @param {ctx} Koa Context
   */
  async findByDate(ctx) {
    ctx.body = await CustomerOrderDetails.find(
      {
        billDate: ctx.params.billDate,
      },
      null,
      { sort: { billNo: 1 } }
    );
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

  // line notify token test KcaREbdbBgxOQpL3bEwdZcCtCVT8HjjKumQCHLSHRo7
  async add(ctx) {
    try {
      const { billNo, billDate, ...payload } = ctx.request.body;
      const detail = await CustomerOrderDetails.findOneAndUpdate(
        { billNo, billDate },
        { ...payload },
        { upsert: true, new: true }
      );
      await lineNotify().notify({ message: lineNotifyMessageBuilder(detail) });
      ctx.body = detail;
    } catch (err) {
      ctx.throw(422);
    }
  }
}

export default new CustomerOrderDetailControllers();

import mongoose from "mongoose";

const { Schema } = mongoose;

// To fix https://github.com/Automattic/mongoose/issues/4291
mongoose.Promise = global.Promise;

const citySchema = new Schema({
  name: String,
  billNo: {
    type: String,
    required: true,
  },
  billDate: {
    type: String,
    required: true,
  },
  addressInfo: {
    address: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    subdistrict: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
  },
  productDetail: {
    detail: String,
    totalCost: Number,
    etc: String,
    deliveryCost: Number,
  },
  phones: { type: [String], required: true },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CustomerOrderDetail", citySchema);

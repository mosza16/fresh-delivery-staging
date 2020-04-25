import axios from "axios";
import qs from "querystring";

const BASE_URL = "https://notify-api.line.me";
const PATH = "/api/notify";

const token =
  process.env.NODE_ENV === "production"
    ? "KcaREbdbBgxOQpL3bEwdZcCtCVT8HjjKumQCHLSHRo7"
    : "KcaREbdbBgxOQpL3bEwdZcCtCVT8HjjKumQCHLSHRo7";

export default function () {
  if (!token) {
    throw new Error("token is required");
  }
  return {
    notify: async (params) => {
      if (!params.message) {
        throw new Error("message is required");
      }
      const options = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${token}`,
        },
      };
      const resp = await axios.post(
        `${BASE_URL}${PATH}`,
        qs.stringify(params),
        options
      );
      console.log(resp);
      return resp;
    },
  };
}

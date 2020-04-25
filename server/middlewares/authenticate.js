import jwt from "jsonwebtoken";

export default (ctx) => {
  if (ctx.request.body.password === "password@00000000") {
    ctx.status = 200;
    ctx.body = {
      token: jwt.sign(
        {
          role: "admin",
        },
        "AFSAD*!@*&!)@@DASDS-jwt-secret-key",
        { expiresIn: "2d" }
      ), // Store this key in an environment variable
      message: "Successful Authentication",
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: "Authentication Failed",
    };
  }
  return ctx;
};

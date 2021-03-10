const jwt = require("jsonwebtoken");
require("dotenv").config();
const secretKey = process.env.SECRETKEY;

module.exports = {
  validateToken: (req, res, next) => {
    const authenticate = req.headers.authorization;

    if (!authenticate)
      return res.status(401).json({ message: "Access Denied" });

    try {
      const verified = jwt.verify(authenticate, secretKey);
      res.locals.users = verified;

      data = verified;
      next();
    } catch (error) {
      console.log(verified);
      res.status(400).json({ message: "Invalid Token" });
    }
  },
};

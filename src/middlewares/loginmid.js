module.exports = {
  loginmid: (req, res, next) => {
    const allowedKeys = ["username", "password"];

    const data = Object.keys(req.body);
    try {
      if (!data.length) {
        throw new Error("request data can't be empty");
      }

      for (let i = 0; i < req.body.length; i++) {
        const item = object.keys(req.body[i]);

        for (let j = 0; j < item, length; j++) {
          if (!allowedKeys.includes(item[j])) {
            throw new Error("format request data invalid");
          }
        }
      }
      next();
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

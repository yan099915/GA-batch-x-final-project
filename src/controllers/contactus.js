const contactusSchema = require("../models/contactUs");

module.exports = {
  contact: async (req, res) => {
    const email = req.body.email;
    const suggest = req.body.suggest;

    try {
      const services = await contactusSchema.create({
        email: email,
        suggest: suggest,
      });
      res.json({ message: "Message Received", data: { email: email } });
    } catch (error) {
      res.status(400).json({ message: "Message not received" });
    }
  },
};

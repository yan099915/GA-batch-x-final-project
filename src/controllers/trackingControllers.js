//Dependencies
const trackingModel = require("../models/tracking");
const historyModel = require("../models/historyExercise");
const jwt = require("jsonwebtoken");
const content = require("../models/content");
const secretKey = process.env.SECRETKEY;

module.exports = {
  insert: async (req, res) => {
    try {
      //Get data from body
      const { body } = req;
      const userId = res.locals.users.userId;

      //Make new data
      const trackingData = { userId: userId, ...body };

      //Insert new data to database
      const insertTracking = await trackingModel.create(trackingData);
      res
        .status(200)
        .json({ message: "succes insert data", data: insertTracking });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  browse: async (req, res) => {
    try {
      //Get user id from token
      const userId = res.locals.users.userId;
      const name = res.locals.users.name;

      //Search tracking models
      const browseTracking = await trackingModel
        .find({ userId: userId })
        .sort({ _id: -1 });

      res
        .status(200)
        .json({ message: "succes get data", name: name, data: browseTracking });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  delete: async (req, res) => {
    try {
      //Get tracking id
      const trackingId = req.params;
      console.log(trackingId);

      //Delete tracking
      const deleteTraking = await trackingModel.findByIdAndDelete(trackingId);
      res
        .status(200)
        .json({ message: "succes delete data", data: deleteTraking });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  },
  inputHistory: async (req, res) => {
    try {
      const { content, video, time} = req.body
      const id = data.userId;
      const history = {
        user_id: id,
        content: content,
        video: video,
        times: time
      }
      const filter = {
        user_id: id
      }
      const getHistory = await historyModel.find(filter)
      if(getHistory.length >= 10){
        const deleteHistory = await historyModel.findByIdAndDelete({_id: getHistory[0].id})
      }
      const insertHistory = await historyModel.create(history)
      res
        .status(200)
        .json({ message: "success input history"});
    } catch (error) {
      console.log(error)
      res.status(400).json({ message: error });
    }
  },
  getHistory: async (req, res) => {
    try {
      const id = data.userId;
      const filter = {
        user_id: id
      }
      const getHistory = await historyModel.find(filter)
      res
        .status(200)
        .json({ message: "success get history data", data: getHistory});
    } catch (error) {
      console.log(insertHistory)
      res.status(400).json({ message: error });
    }
  },
};

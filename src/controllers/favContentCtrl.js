const favouriteModel = require("../models/favContentSchem");
const UsersModel = require("../models/users")();
const Content = require("../models/content")();

module.exports = {
  insertFav: async (req, res) => {
    try {
      //find user_id
      const user_id = res.locals.users.userId;
      console.log(user_id);
      //fill with content_id
      const content_id = req.body.content_id;
      console.log(content_id);

      const tittle = req.body.tittle;

      // create new bookmarks data
      const favContentData = {
        content_id: content_id,
        user_id: user_id,
        tittle: tittle,
      };
      //create bookmarks
      const favContent = await favouriteModel.create(favContentData);

      res.status(200).json({
        message: "Bookmark Success",
        data: favContentData,
      });
    } catch (error) {
      console.log(error);
      res.status.json({ message: error.message });
    }
  },

  removeFav: async (req, res) => {
    try {
      //remove favourite content
      const deleteFav = await favouriteModel.findByIdAndDelete(
        (id = req.params.id)
      );
      res
        .status(200)
        .json({ message: "Success Delete Favourite", data: deleteFav });
    } catch (error) {
      res.status(400).json({
        message: "Unsuccessfull remove favourite",
        message: error.message,
      });
    }
  },

  getAll: async (req, res) => {
    await favouriteModel
      .find()
      .populate()
      .exec()
      .then((favourite) => {
        res.status(200).json(favourite);
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  },

  getFav: async (req, res) => {
    try {
      //get favourite content
      const getFav = await favouriteModel.findOne({
        _id: req.params.id,
      });
      res.status(200).json({ message: "Success get data", data: getFav });
    } catch (error) {
      res.status(400).json({
        message: "Unsuccessfull get favourite",
        message: error.message,
      });
    }
  },

  updateFav: async (req, res) => {
    try {
      const user_id = res.locals.users.userId;

      const content_id = req.body.content_id;

      const tittle = req.body.tittle;

      const favContentData = {
        content_id: content_id,
        user_id: user_id,
        tittle: tittle,
      };
      //update favourite content
      const updateFav = await favouriteModel.findOneAndUpdate(favContentData);
      res.status(200).json({
        message: "Success Update Favourite Content",
        data: favContentData,
      });
    } catch (error) {
      res.status(400).json({
        message: "Unsuccessfull update favourite",
        message: error.message,
      });
    }
  },
};

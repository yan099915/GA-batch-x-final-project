const aws = require("aws-sdk");
const fs = require("fs");
const fileType = require("file-type");
const multiparty = require("multiparty");
const Content = require("../models/content");
const Video = require("../models/video");
const { url } = require("inspector");

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET_CONTENT,
  accessKeyId: process.env.S3_ACCESS_KEY_CONTENT,
  region: "ap-southeast-1",
});

const s3 = new aws.S3();

exports.insertContent = async (req, res) => {
  const { title, image, description, totalTime, gender, equipment, intensity, level} = req.body;

  let message = "";
  try {
    const contentExist = await Content.findOne({ title: title });
    if (contentExist) {
      res.send({
        status: 401,
        message: `${title} already exist`,
      });
    } else {
      let createContent = await Content.create({
        title: title,
        image: image,
        description: description,
        time: totalTime,
        gender: gender,
        equipment: equipment,
        intensity: intensity,
        level: level,
      });

      let count = Object.keys(req.body).length;
      const id = createContent.id;
      const {
        time1, url1, move1, time2, url2, move2, time3, url3, move3,
        time4, url4, move4, time5, url5, move5, time6, url6, move6,
        time7, url7, move7, time8, url8, move8, time9, url9, move9,
        time10, url10, move10,
      } = req.body;

      for (i = 1; i <= (count - 8) / 3; i++) {
        let timeInput = eval("time" + i);
        let urlInput = eval("url" + i);
        let moveInput = eval("move" + i);

        const content = await Content.findOne({ _id: id });
        const insertVideoUrl = new Video({
          time: timeInput,
          videoUrl: urlInput,
          moves: moveInput,
        });
        await insertVideoUrl.save();

        content.video.push(insertVideoUrl);
        await content.save();
      }

      if (createContent) {
        message = `${title} successfully inserted`;
      }
      res.send({
        status: 200,
        message: message,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getAllContent = async (req, res) => {
  await Content.find()
    .populate({
      path: "video",
      select: ["time", "videoUrl", "moves"],
    })
    .exec()
    .then((contents) => {
      res.status(200).json(contents);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.contentByGender = async (req, res) => {
  console.log(gender)
  await Content.find({ gender: gender})
    .populate({
      path: "video",
      select: ["time", "videoUrl", "moves"],
    })
    .exec()
    .then((contents) => {
      res.status(200).json(contents);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneContent = async (req, res) => {
  await Content.findOne({ _id: req.params.id })
    .populate({
      path: "video",
      select: ["time", "videoUrl", "moves"],
    })
    .exec()
    .then((content) => {
      res.status(200).json(content);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.updateContent = async (req, res) => {
  const body = req.body;
  const content = new Content({
    _id: req.params.id,
    title: body.title,
    description: body.description,
    time: body.time,
    gender: body.gender,
    equipment: body.equipment,
    intensity: body.intensity,
    level: body.level,
    url1: body.url1, time1: body.time1, move1: body.move1,
    url2: body.url2, time2: body.time2, move2: body.move2,
    url3: body.url3, time3: body.time3, move3: body.move3,
    url4: body.url4, time4: body.time4, move4: body.move4,
    url5: body.url5, time5: body.time5, move5: body.move5,
    url6: body.url6, time6: body.time6, move6: body.move6,
    url7: body.url7, time7: body.time7, move7: body.move7,
    url8: body.url8, time8: body.time8, move8: body.move8,
    url9: body.url9, time9: body.time9, move9: body.move9,
    url10: body.url10, time10: body.time10, move10: body.move10,
  });

  await Content.updateOne({ _id: req.params.id }, content)
    .then(() => {
      res.status(201).json({
        message: "Content updated successfully!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteContent = async (req, res) => {
  await Content.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.uploadImage = async (req, res) => {
  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    if (error) {
      return res.status(500).send(error);
    }

    try {
      const path = files.image[0].path;
      const buffer = fs.readFileSync(path);
      const fileName = new Date().getTime();
      const keyName = `images/${fileName}`;

      const params = {
        ACL: "public-read",
        Body: buffer,
        Bucket: "sportsman-final-project",
        ContentType: "image/jpeg",
        Key: keyName,
      };

      const data = await s3.upload(params).promise();
      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).send(err);
    }
  });
};

// // IF YOU WANT TO UPLOAD VIDEO
// exports.uploadVideo = async (req, res) => {
//     const form = new multiparty.Form();
//     form.parse(req, async (error, fields, files) => {
//       if (error) {
//         return res.status(500).send(error);
//       };

//       try {
//         const path = files.video[0].path;
//         const buffer = fs.readFileSync(path);
//         const type = await fileType(buffer);
//         const fileName = `videos/${Date.now().toString()}`;

//         const params = {
//           ACL: 'public-read',
//           Body: buffer,
//           Bucket: 'sportsman-final-project',
//           ContentType: type.mime,
//           Key: `${fileName}.${type.ext}`,
//         };

//         const data = await s3.upload(params).promise();

//         return res.status(200).send(data);
//       } catch (err) {
//         console.log(err);
//         return res.status(500).send(err);
//       }
//     });
// }

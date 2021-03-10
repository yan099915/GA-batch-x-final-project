const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
const eventFunction = require("./eventFunction");
const cron = require("node-cron");

eventEmitter.on("daily", eventFunction.dailyReminder);

cron.schedule("0 03 * * *", () => {
  eventEmitter.emit("daily");
});

module.exports = eventEmitter;

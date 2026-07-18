const EventEmitter = require("events");

//  Creating Instance
const customEmitter = new EventEmitter();

customEmitter.on("response", (name, id) => {
  console.log(`data recieved user ${name} with:${id}`);
});

customEmitter.on("response", () => {
  console.log("some other logic here");
});

customEmitter.emit("response", "john", 34);

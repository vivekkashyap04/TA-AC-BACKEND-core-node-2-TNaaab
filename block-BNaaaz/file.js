const fs = require("fs");
const { EventEmitter } = require("events");

var myEmitter = new EventEmitter();

myEmitter.on("readfile", (msg) => {
    console.log(msg);
})

myEmitter.emit('readfile', fs.createReadStream('./readme.txt'));
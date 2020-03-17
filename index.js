const tmi = require('tmi.js');
const config  = require('./config.js');
const ks = require("node-key-sender");
// Define configuration options
const opts = {
  identity: {
    username: config.id,
    password: config.secret
  },
  channels: [
    "jeffrefresh"
  ],
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

  // If the command is known, let's execute it
  if (commandName === 'down') {
    ///client.say(target, `You rolled a ${num}`);
    ks.sendKey("down")
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === 'up') {
    ks.sendKey("up")
    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "right"){
    ks.sendKey("right")

    console.log(`* Executed ${commandName} command`);
  } else if (commandName === "left"){
    ks.sendKey("left")
    console.log(`* Executed ${commandName} command`);
  } else if (commandName ==="f"){
      ks.sendKey("f")
  } else if (commandName === "speed"){
      ks.sendKey("page_up")
  }else{
    console.log(`* Unknown command ${commandName}`);
  }
}
// Function called when the "dice" command is issued
function rollDice () {
  const sides = 6;
  return Math.floor(Math.random() * sides) + 1;
}
// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}
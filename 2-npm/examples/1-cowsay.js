// npm i cowsay
const cowsay = require("cowsay");

console.log(
  cowsay.say({
    text: "I'm a moooodule!",
    e: "oO",
    T: " U ",
  }),
);

console.log(
  cowsay.think({
    text: "I think, I am... a module?",
    e: "--",
    T: "UU",
  }),
);

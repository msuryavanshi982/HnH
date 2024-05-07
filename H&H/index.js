var figlet = require("figlet");
var colors = require('colors');
 
console.log('Algo8.ai'.green); // outputs green text
console.log('i like coding'.underline.red) // outputs red underlined text
console.log('inverse the color'.inverse); // inverses the color
console.log('OMG Rainbows!'.rainbow); // rainbow
console.log('we will change the world with technology'.trap); // Drops the bass

figlet("Algo8 ai", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});
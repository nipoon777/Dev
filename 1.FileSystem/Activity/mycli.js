// commands->
// view --tree, --flat
//  organize-> same folder , multiple folder
// help
// [node ,mycli.js ,view ,dirName ,mode]
// node mycli.js organize -/foldername
// node mycli.js help


// Command implement karenge 
// 1. view --> -- tree, -- flat
// 2. organize --> - / < dir-name >
// 3. help --> Specify the commands

// Jo bhi code likhenge vo ek architecture follow karke likhenge vo book mai likhi hai revise karle

let {organizeFn } = require("./Commands/organize.js");
let {helpFn} = require("./Commands/help.js");
let {viewFn} = require("./Commands/view.js");
let input = process.argv.slice(2);

let command = input[0];

switch(command){
    case "view" :
        viewFn(input[1]);
        break;
    case "organize":
        organizeFn();
        break;
    case "help" :
        helpFn();
        break;
    default: 
        console.log("Wrong Command Entered, Please call help for all Commands");
}
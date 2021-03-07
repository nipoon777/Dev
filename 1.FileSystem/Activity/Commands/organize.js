let fs = require("fs");
let path = require("path");

function organizeExecutor(dirPath) {
    fs.mkdir("C:/Downloads/OrganisedFiles");
    console.log("Organise Executed");
}

module.exports = {
    organizeFn : organizeExecutor
};
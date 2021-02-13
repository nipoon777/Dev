
let fs = require("fs");

function isFileChecker(dirPath){
    return fs.lstatSync(dirPath).isFile();
}

function readChildren(dirPath){
    return fs.readdirSync(dirPath);
}

function viewFlat(dirPath){
    let isFile = isFileChecker(dirPath);

    if(isFile){
        console.log(dirPath + "*");
    }else{
        console.log(dirPath);

        let children = readChildren(dirPath);

        for(let i = 0 ; i < children.length ; i++ ){
            viewFlat(dirPath + "/" + children[i]);   
        }
    }

}

viewFlat("D:\BranchTransfer");

module.exports = {
    viewFFn : viewFlat
}

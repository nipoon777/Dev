let fs = require("fs");
let path = require ("path");

function viewExecutor(dirPath, parameter) {
    if(parameter == "--tree"){
        viewTree(dirPath, "");
    }else if ( parameter == "--flat"){
        viewFlat(dirPath);
    }else{
        console.log(" Invalid command the parameter should be -- tree or -- flat");
    }
}

function viewTree(dirPath, indent){
    
    let isFile = isFileChecker(dirPath);
    if (isFile){
        console.log(indent, path.basename(dirPath) +"*");
    }else{
        console.log(indent,path.basename(dirPath));

        let children = getDirectory(dirPath);

        for(let i = 0 ; i < children.length ; i++ ){
            viewTree(path.join(dirPath, children[i]), indent + "\t");
        }

    }
    
}

function isFileChecker(dirPath){
    return fs.lstatSync(dirPath).isFile()
}

function getDirectory(dirPath){
    return fs.readdirSync(dirPath);
}

function viewFlat(dirPath){
    let isFile = isFileChecker(dirPath);

    if(isFile){
        console.log(dirPath + "*");
    }else{
        console.log(dirPath);

        let children = getDirectory(dirPath);

        for(let i = 0 ; i < children.length ; i++){
            viewFlat(path.join(dirPath, children[i]));
        }
    }
}

module.exports = {
    viewFn : viewExecutor
}
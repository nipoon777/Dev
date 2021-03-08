// 1. Generic Tree ko print Karna hai.

// let root = {
//     name : "d10",
//     children : [
//         {
//             name : "d20",
//             children : [
//                 {
//                     name : "d50",
//                     children :[
//                         {
//                             name : "d60",
//                             children : []
//                         },
//                         {
//                             name : "d70",
//                             children : []
//                         }
//                     ]
//                 },
//                 {
//                     name : "d80",
//                     children : []
//                 },
//                 {
//                     name : "d90",
//                     children : []
//                 }
//             ]
//         },
//         {
//             name : "d30",
//             children : [
//                 {
//                     name : "d100",
//                     children : []
//                 }
//             ]
//         },
//         {
//             name : "d40",
//             children : []
//         }

//     ]
// }
// function printTree(node){
//     let nodeName = node.name + "---> ";
//     for( let child = 0 ; child < node.children.length ; child++ ){
//         nodeName += node.children[child].name + ", ";
//     }

//     console.log(nodeName);

//     for( let child = 0 ; child < node.children.length ; child++ ){
//         printTree(node.children[child]);
//     }
// }
//printTree(root);

// 2. Implement the same feature using File Directory
//  - To Import we use require in JS.

let fs = require ("fs");
let path = require ("path");

function checkForFile(dirPath){
    return fs.lstatSync(dirPath).isFile();
}

function readDir(dirPath){
    return fs.readdirSync(dirPath);
}
function viewFlat(dirPath){
    let isFile = checkForFile(dirPath);

    if(isFile){
        console.log(dirPath + "*");
    }else{
        console.log(dirPath);

        let children = readDir(dirPath);

        for(let i = 0 ; i < children.length ; i++ ){
            viewFlat(path.join(dirPath, children[i]));
        }
    }

}

function viewTree(dirPath, indent){
    let isFile = checkForFile(dirPath);
    let baseName = path.basename(dirPath);
    if( isFile ){
        console.log(indent + baseName + "*");
    }else{
        console.log(indent + baseName);

        let children = readDir(dirPath);

        for( let i = 0 ; i < children.length ; i++ ){
            viewTree(path.join(dirPath, children[i]), indent + "\t");
        }
    }
}

// viewFlat("C:\\PepCode");

//viewTree("C:\\Dev\\1.FileSystem\\Raw\\d10", "");

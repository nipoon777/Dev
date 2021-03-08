let fs = require("fs");
let path = require("path");

let types = {
    media: ['mp4', 'mkv', 'mp3', '.JPG', '.JPEG', '.png'],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex',".html"],
    app: ['exe', 'dmg', 'pkg', "deb"]
};

function organizeExecutor(dirPath) {
    //1. Create OrganisedFiles And Its Sub Directories
    let organisedPath = path.join(dirPath, "OrganisedFiles");
    createDirectory(organisedPath);

    for( let key in types ){
        let folderPath = path.join(organisedPath, key);
        createDirectory(folderPath);
    }
    let others = path.join(organisedPath, "others");

    createDirectory(others);
    //2. Search for Each file and find its type And Copy to Destination
    organise(dirPath, organisedPath);
}


function createDirectory( dirPath ){
    if( !fs.existsSync(dirPath) ){
        return fs.mkdirSync(dirPath);
    }
}

function organise(dirPath, organisedPath){
    let isFile = checkForFile(dirPath);
    if(isFile){
        let type = getFileType(dirPath);
        let destFolder = getFolderName(type);
        let destFilePath = path.join(organisedPath, destFolder);
        copyFromSrcToDest(dirPath, destFilePath);
    }else{
        let children = readContent(dirPath);
        for( let i = 0 ; i < children.length ; i++ ){
            organise(path.join(dirPath,children[i]), organisedPath);
        }
        
    }
}

function copyFromSrcToDest(srcPath, destFolder){
    let originalName = path.basename(srcPath);
    let destFile = path.join(destFolder, originalName);

    return fs.copyFileSync(srcPath, destFile);

}

function readContent(dirPath){
    return fs.readdirSync(dirPath);
}

function checkForFile(dirPath){
    return fs.lstatSync(dirPath).isFile();
}
function getFileType(dirPath){
    let ext = path.extname(dirPath);
    return ext.substring(1);
}

function getFolderName(type){
    for(let key in types ){
        for( let j = 0 ; j < types[key].length ; j++ ){
            if(type == types[key][j]){
                return key;
            }
        }
    }
    return "others";
}


module.exports = {
    organizeFn : organizeExecutor
};
let fs = require("fs");
let path = require("path");
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}
let input = process.argv.slice(2);

let toOrganisedirPath = input[0];

function createDirectory(dirToCreate){
    if(!fs.existsSync(dirToCreate)){
        fs.mkdirSync(dirToCreate);
    }
}

let organisedPath = path.join(toOrganisedirPath, "OrganisedFiles");

createDirectory(organisedPath);

for( let key in types ){
    let subDir = path.join(organisedPath,key);
    createDirectory(subDir); 
}
let others = path.join(organisedPath,"others");
createDirectory(others);

//To Find the Destination Where to move the files;

function getDirectory(dirPath){
    return fs.readdirSync(dirPath);
}
function isFileChecker(dirPath){
    return fs.lstatSync(dirPath).isFile();
}

function getFolderName(dirPath){
    let strArr = dirPath.split(".");
    let ext = strArr.pop();

    for( let key in types ){
        for( let i = 0 ; i < types[key].length ; i++ ){
            if( ext == types[key][i]){
                return key;
            }
        }
    }
    return "others";
}
function copyToDestination(src, dest){
    let originalName = path.basename(src);
    let destFilePath = path.join(dest, originalName);

    fs.copyFileSync(src, destFilePath);  
}
function organizeFiles(dirPath){

    let isFile = isFileChecker(dirPath);

    if(isFile){
        let foldername = getFolderName(dirPath);

        let destFolderName = path.join(organisedPath, foldername);

        copyToDestination(dirPath, destFolderName);

    }else{
        let children = getDirectory(dirPath);

        for(let i = 0 ; i < children.length ; i++){
            organizeFiles(path.join(dirPath,children[i]));
        }
    }
}

organizeFiles(toOrganisedirPath);
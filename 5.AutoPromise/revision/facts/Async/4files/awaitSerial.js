let fs = require("fs");

try{
    async function readContent(){
        let data1 = await fs.promises.readFile("f1.txt");
        console.log(" Data : "+ data1);
        let data2 = await fs.promises.readFile("f2.txt");
        console.log(" Data : "+ data2);
        let data3 = await fs.promises.readFile("f3.txt");
        console.log(" Data : "+ data3);
        let data4 =await fs.promises.readFile("f4.txt");
        console.log(" Data : "+ data4);
    }
    readContent();
}catch(err){
    console.log(err);
}

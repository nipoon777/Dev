var robot = require("robotjs");
var fs = require("fs");

setTimeout(handlePaint, 2000 );

function handlePaint(){
    robot.moveMouseSmooth(97,751);
    robot.mouseClick();
    robot.typeString(" paint");
    robot.keyTap("enter");
    setTimeout(writeHi,2000);
}

function writeHi(){
    robot.moveMouseSmooth(200,320);
    robot.mouseToggle("down","left");
    robot.dragMouse(200,420);
    robot.mouseToggle("up","left");

    robot.moveMouseSmooth(200,370);
    robot.mouseToggle("down","left");
    robot.dragMouse(300,370);
    robot.mouseToggle("up","left");
    
    robot.moveMouseSmooth(300,320);
    robot.mouseToggle("down","left");
    robot.dragMouse(300,420);
    robot.mouseToggle("up","left");

    robot.moveMouseSmooth(400,320);
    robot.mouseToggle("down","left");
    robot.dragMouse(400,420);
    robot.mouseToggle("up","left");

    robot.moveMouseSmooth(1252,6);
    robot.mouseClick();
    setTimeout(handleNotePad, 2000);
}

function handleNotePad() {
    robot.moveMouseSmooth(97,751);
    robot.mouseClick();
    robot.typeString(" notepad");
    robot.keyTap("enter");
    setTimeout(sayHello,2000);
}

function sayHello(){
    robot.typeString("Hello EveryOne welcome To Robot JS");
    robot.moveMouseSmooth(514,93);
    robot.mouseClick();
    setTimeout(openChrome,2000);
}

function openChrome(){
    robot.moveMouseSmooth(97,751);
    robot.mouseClick();
    robot.typeString(" chrome");
    robot.keyTap("enter");
    setTimeout(openTabs,2000);
}

function openTabs() {
    var rdata = fs.readFileSync("./chrome.json");
    var tabs = JSON.parse(rdata);

    for( var i = 0 ; i < tabs.length ; i++ ){
        for( var j = 0 ; j < tabs[i].length ; j++ ){
            robot.typeString(tabs[i][j]);
                robot.keyTap("enter");
            if( j < tabs[i].length - 1 ){ 
                robot.keyToggle("control","down");
                robot.keyTap("t");
                robot.keyToggle("control","up");

            }else if(i < tabs.length - 1 ){

                robot.keyToggle("control","down");
                robot.keyTap("n");
                robot.keyToggle("control","up");
            }
        }
    }
}

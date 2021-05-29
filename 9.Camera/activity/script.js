// const allconstraints = navigator.mediaDevices.getSupportedConstraints();
let videoElem = document.querySelector("#video_elem");
let videoPlayer = document.querySelector("video");
let audioElem = document.querySelector("audio");
let pictureElem = document.querySelector(".picture_btn");
// So that user hame permission de camera aur microphone use karne 

let constraints = {
    video : true,
    audio : true
}
let videoRecorder = document.querySelector("#record_video");
let recordState = false;

let mediaRecorder;
let buffer = [];
let filter;

let currZoom = 1;
let zoomInBtn = document.getElementById("in");
let zoomOutBtn = document.getElementById("out");

zoomInBtn.addEventListener("click", function(){
    let vidScale = Number(
        videoPlayer.style.transform.split("(")[1].split(")")[0]
    )
    if( vidScale < 3){
        currZoom = vidScale + 0.2;
        videoPlayer.style.transform = `scale(${currZoom})`;
    }
});
zoomOutBtn.addEventListener("click", function(){
    let vidScale = Number(
        videoPlayer.style.transform.split("(")[1].split(")")[0]
    )
    if( vidScale > 1){
        currZoom = vidScale - 0.2;
        videoPlayer.style.transform = `scale(${currZoom})`;
    }
});








let allFilterContainer = document.querySelectorAll(".filter");

for( let i = 0 ; i < allFilterContainer.length ; i++ ){
    allFilterContainer[i].addEventListener("click", function (e){
        console.log("I am Called");
        filter = e.currentTarget.style.backgroundColor;
        console.log(filter);
        removeFilter();
        addFilter(filter);
    });
}

function addFilter(filterColor){
    let filter = document.createElement("div");
    filter.classList.add("on_screen_filter");
    filter.style.width = "100vw";
    filter.style.height = "100vh";
    filter.style.backgroundColor = `${filterColor}`;
    filter.style.position = "fixed";
    filter.style.top = "0px";
    document.querySelector('body').appendChild(filter);
}


function removeFilter(){
    let e1 = document.querySelector(".on_screen_filter");
    if(e1){
        e1.remove();
    }
}











navigator.mediaDevices
        .getUserMedia(constraints)// Hame promise return hoga depending on user input ya toh then call hoga ya toh catch
        .then( function (mediaStream){
            videoElem.srcObject = mediaStream;
            // audioElem.srcObject = mediaStream;
            mediaRecorder = new MediaRecorder(mediaStream);
            mediaRecorder.addEventListener("dataavailable", function(e){
                buffer.push(e.data);
            });

            mediaRecorder.addEventListener("stop", function () {
                let blob = new Blob(buffer, { type : "video/mp4"});
                const url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.download = "file.mp4";
                a.href = url;
                a.click();
                buffer = [];
            });
        })
        .catch( function(err) {
            console.log(err);
        });
videoRecorder.addEventListener("click", function(){
    if(!mediaRecorder){
        alert("First allow Permissions");
    }
    let innerdiv = document.querySelector(".record_div");
    if( recordState == false ){
        mediaRecorder.start();
        innerdiv.classList.add("record_animation");
        currZoom = 1;
        videoPlayer.style.transform = `scale(${currZoom})`;
        recordState = true;
    }else{
        mediaRecorder.stop();
        innerdiv.classList.remove("record_animation");
        recordState = false;
    }
})


pictureElem.addEventListener("click", capture);

function capture(){
    let canvas = document.createElement('canvas');
    let innerdiv = document.querySelector(".picture_div");
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;
    innerdiv.classList.add("picture_animation");
    let tool = canvas.getContext('2d');
    //Origin ko shift karo
    tool.translate(canvas.width /2, canvas.height / 2);
    //Scale
    tool.scale(currZoom, currZoom);
    //Move back to origin
    tool.translate(-canvas.width/2, -canvas.height / 2);

    tool.drawImage(videoPlayer, 0, 0);
    
    if( filter ){
        tool.fillStyle = filter;
        tool.fillRect(0, 0 , canvas.width, canvas.height);
    }
    let link = document.createElement('a');
    link.download = "image.png";
    link.href = canvas.toDataURL();

    
    link.click();
    link.remove();
    canvas.remove();

    setTimeout( function(){
        innerdiv.classList.remove("picture_animation");
    }, 1000);

}
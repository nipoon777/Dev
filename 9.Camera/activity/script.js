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
    if( recordState == false ){
        mediaRecorder.start();
        videoRecorder.innerHTML = "Recording....";
        recordState = true;
    }else{
        mediaRecorder.stop();
        videoRecorder.innerHTML = "Record";
        recordState = false;
    }
})


pictureElem.addEventListener("click", capture);

function capture(){
    let canvas = document.createElement('canvas');
    canvas.height = videoPlayer.videoHeight;
    canvas.width = videoPlayer.videoWidth;

    let tool = canvas.getContext('2d');
    tool.drawImage(videoPlayer, 0, 0);

    let link = document.createElement('a');
    link.download = "image.png";
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
    canvas.remove();

}
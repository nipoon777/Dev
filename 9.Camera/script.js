// const allconstraints = navigator.mediaDevices.getSupportedConstraints();
let videoElem = document.querySelector("#video_elem");
let audioElem = document.querySelector("audio");
let constraints = {
    video : true,
    audio : true
}
let videoRecorder = document.querySelector("#record_video");
let recordState = false;

let mediaRecorder;
let buffer = [];
navigator.mediaDevices
        .getUserMedia(constraints)
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
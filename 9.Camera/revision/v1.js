let videoElem = document.querySelector(".video_elem");
// let audioElem = document.querySelector()


let videoRecordBtn = document.querySelector(".record_btn");
        let constraints = {
            video : true,
            audio : true
        };
        let mediaRecorder;
        let recordState = false;
        let chunks = [];

        videoRecordBtn.addEventListener("click", function(e){
            
            if( mediaRecorder != undefined ){
                if(recordState == false ){
                    mediaRecorder.start();
                    videoRecordBtn.innerText = "Recording....";
                    recordState = true;
                }else{
                    mediaRecorder.stop();
                    videoRecordBtn.innerText = "Record";
                    recordState = false;
                }

            }
            
        })




        navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
            
            videoElem.srcObject = mediaStream;
            mediaRecorder = new MediaRecorder(mediaStream);
            mediaRecorder.ondataavailable = function(e){
                chunks.push(e.data);
            }

            mediaRecorder.onstop = function(){
                let blob = new Blob( chunks, {type :'video/mp4'});
                const url = window.URL.createObjectURL(blob);
                let a = document.createElement("a");
                a.download = "file.mp4";
                a.href = url;
                a.click();

            }



        });

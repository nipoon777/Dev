let request = indexedDB.open("Camera", 1);
let db;

request.onsuccess = function (e) {
    db = request.result;


}

request.onerror = function (e) {
    console.log('error');
}

request.onupgradeneeded = function (e) {
    db = request.result;
    db.createObjectStore('gallery', {keyPath : "mId"});
}

function addMediaToGallery(data, type){
    let txn = db.transaction("gallery","readwrite");
    let gallery = txn.objectStore("gallery");
    gallery.add({ mId : Date.now(),
        type,
        media : data 
    });
}

function viewMedia(){
    let main_container = document.querySelector(".main_container");
    let tx = db.transaction("gallery", "readonly");
    let gallery = tx.objectStore("gallery");

    let req = gallery.openCursor();

    req.onsuccess = function(){
        let cursor = req.result;
        if( cursor ){
            if( cursor.value.type == "video"){
                let videoContainer = document.createElement("div");
                videoContainer.setAttribute("data-mId", cursor.value.mId);
                videoContainer.classList.add("gallery_vid_container");

                let video = document.createElement("video");
                video.classList.add("video_elem");
                videoContainer.appendChild(video);

                //Delete Button

                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("gallery_delete_btn");
                deleteBtn.innerText = "Delete";
                deleteBtn.addEventListener("click", deleteBtnHandler);

                //DownLoad Button

                let downLoadBtn = document.createElement("button");
                downLoadBtn.classList.add("gallery_download_btn");
                downLoadBtn.innerText = "Download";
                downLoadBtn.addEventListener("click", downloadMedia);

                videoContainer.appendChild(deleteBtn);
                videoContainer.appendChild(downLoadBtn);


                video.controls = true;
                video.autoplay = true;

                video.src = URL.createObjectURL(cursor.value.media);

                main_container.appendChild(videoContainer);

            }else{

                let imgContainer = document.createElement("div");
                imgContainer.setAttribute("data-mId", cursor.value.mId);
                imgContainer.classList.add("gallery_img_container");

                let img = document.createElement("img");
                img.src = cursor.value.media;
                img.classList.add("img_elem");
                imgContainer.appendChild(img);

                let downLoadBtn = document.createElement("button");
                downLoadBtn.classList.add("gallery_download_btn");
                downLoadBtn.innerText = "Download";
                downLoadBtn.addEventListener("click", downloadMedia);


                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("gallery_delete_btn");
                deleteBtn.innerText = "Delete";
                deleteBtn.addEventListener("click", deleteBtnHandler);

                imgContainer.appendChild(deleteBtn);
                imgContainer.appendChild(downLoadBtn);

                main_container.appendChild(imgContainer);
                
            }


            cursor.continue();
        }
    }
}

function deleteMediaFromGallery(mId){
    let tx = db.transaction("gallery","readwrite");
    let gallery = tx.objectStore("gallery");
    gallery.delete(Number(mId));
}

function deleteBtnHandler(e){
    let mId = e.currentTarget.parentNode.getAttribute('data-mId');
    deleteMediaFromGallery(mId);
    e.currentTarget.parentNode.remove();
}


function downloadMedia(e){
    let mId = e.currentTarget.parentNode.getAttribute('data-mId');
    dowmloadMediaFromDb(mId);
}

function dowmloadMediaFromDb(mId){
    let tx = db.transaction("gallery", "readonly");
    let gallery = tx.objectStore("gallery");
    // console.log(gallery)
    let req = gallery.openCursor();

    req.onsuccess = function(e){
        let cursor = req.result;
        if(cursor){
            if(cursor.value.mId == mId){
                console.log(cursor.value);
                let a = document.createElement("a");
                if( cursor.value.type == "img"){
                    const url = cursor.value.media;
                    a.download = mId+".png";
                    a.href = url;
                    a.click();
                }else{
                    const url = window.URL.createObjectURL(cursor.value.media);
                    a.download = mId+".mp4";
                    a.href = url;
                    a.click();
                }
            }else{
                cursor.continue();
            }
        }
    }


}
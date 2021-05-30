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
    let body = document.querySelector("body");
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

                videoContainer.appendChild(deleteBtn);
                videoContainer.appendChild(downLoadBtn);


                video.controls = true;
                video.autoplay = true;

                video.src = URL.createObjectURL(cursor.value.media);

                body.appendChild(videoContainer);

            }else{

                let imgContainer = document.createElement("div");
                imgContainer.setAttribute("data-mId", cursor.value.mId);
                imgContainer.classList.add("gallery_img_container");

                let img = document.createElement("img");
                img.src = cursor.value.media;
                imgContainer.appendChild(img);

                let downLoadBtn = document.createElement("button");
                downLoadBtn.classList.add("gallery_download_btn");
                downLoadBtn.innerText = "Download";

                let deleteBtn = document.createElement("button");
                deleteBtn.classList.add("gallery_delete_btn");
                deleteBtn.innerText = "Delete";
                deleteBtn.addEventListener("click", deleteBtnHandler);

                imgContainer.appendChild(deleteBtn);
                imgContainer.appendChild(downLoadBtn);

                body.appendChild(imgContainer);
                
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
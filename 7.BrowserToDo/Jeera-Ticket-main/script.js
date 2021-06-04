let Pink = document.querySelector(".Pink");
let Blue = document.querySelector(".Blue");
let Green = document.querySelector(".Green");
let Black = document.querySelector(".Black");

let addBtn = document.querySelector(".addBtn");
let crossBtn = document.querySelector(".crossBtn");

let container = document.querySelector(".container");

let popUp = document.querySelector(".addPopUp");
let heading = document.querySelector(".heading");
let addHeading = document.querySelector(".addHeading");
let addBody = document.querySelector(".addBody");

let saveBtn = document.querySelector(".saveBtn");
let viewSaveBtn = document.querySelector(".viewSaveBtn");
let closePopUp = document.querySelector(".closeAddPopUp");

let setPriority = document.querySelectorAll(".setPriority");
let mess = document.querySelector(".mess");

let resetBtn = document.querySelector(".reset");
let helpBtn = document.querySelector(".help");

let pColor = ['Pink', 'Blue', 'Green', 'Black'];
let isDeleted = false;

let taskArr = [];
if (localStorage.getItem("allTask")) {
    taskArr = JSON.parse(localStorage.getItem("allTask"));

    taskArr.forEach(x => {
        let { head, body, color, uid } = x;
        createCard(head, body, color, uid, true);
    })


}

addBtn.addEventListener("click", function () {
    heading.innerHTML = "Add Task"
    container.style.width = "60%";
    popUp.style.right = "0px";
    addHeading.value = "";
    addBody.value = "";
    mess.innerHTML = "";
    viewSaveBtn.style.display = "none";
    saveBtn.style.display = "flex";
    setPriority.forEach((x) => {
        x.classList.remove("active");
        saveBtn.classList.remove(x.classList[1]);
    })
    setPriority[0].classList.add("active");
    saveBtn.classList.add("Pink");
})

crossBtn.addEventListener("click", function () {
    if (isDeleted) {
        crossBtn.classList.remove("activeCross");
        isDeleted = false;
    } else {
        crossBtn.classList.add("activeCross");
        isDeleted = true;

    }
})

closePopUp.addEventListener("click", function () {
    container.style.width = "100%";
    popUp.style.right = "-40%"
})

setPriority.forEach((color) => {

    color.addEventListener("click", function () {
        setPriority.forEach((x) => {
            x.classList.remove("active");
            saveBtn.classList.remove(x.classList[1]);
            viewSaveBtn.classList.remove(x.classList[1]);
        })

        color.classList.add("active");
        saveBtn.classList.add(color.classList[1]);
        viewSaveBtn.classList.add(color.classList[1]);

    })

})

saveBtn.addEventListener("click", function () {

    let head = addHeading.value;
    let body = addBody.value;
    let color = document.querySelector(".active");
    color = color.classList[1];
    if (head.length > 0) {
        let uifn = new ShortUniqueId();
        let uid = uifn();
        createCard(head, body, color, uid);
        container.style.width = "100%";
        popUp.style.right = "-40%";

    } else {
        mess.innerHTML = "Add Heading";
    }
})

function createCard(head, body, color, uid, check) {

    let card = document.createElement("div");
    card.setAttribute("class", "card");
    card.setAttribute("id", uid);
    card.innerHTML = `<div class="colorCircle ${color}"></div>
        <div class="code">#${uid}</div>
        <div class="cardHeading">${head}</div>
        <div class="cardBody">${body}</div>
        <div class="viewBtn ${color}">View</div>`
    container.appendChild(card);
    if (check == undefined) {
        saveTask(head, body, color, uid);
    }

    let viewBtn = card.querySelector(".viewBtn");
    viewBtn.addEventListener("click", function () {
        container.style.width = "60%";
        popUp.style.right = "0%";
        heading.innerHTML = "Task";
        heading.setAttribute("uid", uid);
        addHeading.value = card.querySelector(".cardHeading").innerHTML;
        addBody.value = card.querySelector(".cardBody").innerHTML;
        setPriority.forEach((x) => {
            x.classList.remove("active");
        })
        let color = card.querySelector(".colorCircle");
        color = color.classList[1];
        let ActiveColor = document.querySelector(`.setPriority.${color}`)
        ActiveColor.classList.add("active");
        viewSaveBtn.style.display = "flex";
        saveBtn.style.display = "none";
    })

    card.addEventListener("click", function () {
        if (isDeleted) {
            card.remove();
            for (let i = 0; i < taskArr.length; i++) {
                if (taskArr[i].uid == uid) {
                    taskArr.splice(i, 1);
                    let finalArr = JSON.stringify(taskArr);
                    localStorage.setItem("allTask", finalArr);
                }
            }
        }
    })

    let colorBtn = card.querySelector(".colorCircle");
    colorBtn.addEventListener("click", function () {

        let color = card.querySelector(".colorCircle").classList[1];
        let idx = (pColor.indexOf(color) + 1) % 4;
        colorBtn.classList.remove(color);
        viewBtn.classList.remove(color);
        colorBtn.classList.add(pColor[idx]);
        viewBtn.classList.add(pColor[idx]);
        taskArr.forEach(x => {
            if (x.uid == uid) {

                x.color = pColor[idx];
                localStorage.setItem("allTask", JSON.stringify(taskArr));
                return;
            }
        })

    })

}

viewSaveBtn.addEventListener("click", function () {
    let head = addHeading.value;
    let body = addBody.value;
    let color = document.querySelector(".active");
    color = color.classList[1];
    if (head.length > 0) {
        let uid = heading.getAttribute("uid");

        let card = document.querySelector(`.card[id="${uid}"]`);
        let cardHeading = card.querySelector(".cardHeading");
        let circleColor = card.querySelector(".colorCircle");
        let cardBody = card.querySelector(".cardBody");
        let viewCardBtn = card.querySelector(".viewBtn");
        cardHeading.innerHTML = head;
        cardBody.innerHTML = body;
        circleColor.classList.remove(circleColor.classList[1]);
        circleColor.classList.add(color);
        viewCardBtn.classList.remove(viewCardBtn.classList[1]);
        viewCardBtn.classList.add(color)
        changeTask(head, body, color, uid);
        container.style.width = "100%";
        popUp.style.right = "-40%";

    } else {
        mess.innerHTML = "Add Heading";
    }
})

function saveTask(head, body, color, uid) {
    
    console.log(uid,"0000");
    let obj = {
        color,
        uid,
        body,
        head
    }

    taskArr.push(obj);
    localStorage.setItem("allTask", JSON.stringify(taskArr));
}

function changeTask(head, body, color, uid){
    taskArr.forEach(x => {
        if (x.uid == uid) {
            x.head = head;
            x.body = body;
            x.color = color;
            localStorage.setItem("allTask", JSON.stringify(taskArr));
            return;
        }
    })
}

Pink.addEventListener("click", priorityHandler);
Blue.addEventListener("click", priorityHandler);
Green.addEventListener("click", priorityHandler);
Black.addEventListener("click", priorityHandler);

function priorityHandler(e) {
    let selector = e.currentTarget;
    let color = selector.classList[1];

    let allCards = document.querySelectorAll(".card");
    if (selector.classList[2]) {
        allCards.forEach(x => {
            let cColor = x.querySelector(".colorCircle");
            cColor = cColor.classList[1];
            x.style.height = '300px';
            x.style.width = '220px';
            x.style.padding = '135px 10px 10px 10px';
            x.style.boxShadow = '10px 10px 18px 8px rgba(0, 0, 0, 0.12)'
        })

        Pink.classList.remove("activePriority");
        Black.classList.remove("activePriority");
        Green.classList.remove("activePriority");
        Blue.classList.remove("activePriority");


    } else {
        allCards.forEach(x => {
            let cColor = x.querySelector(".colorCircle");
            cColor = cColor.classList[1];
            if (cColor == color) {
                x.style.height = '300px';
                x.style.width = '220px';
                x.style.padding = '135px 10px 10px 10px';
                x.style.boxShadow = '10px 10px 18px 8px rgba(0, 0, 0, 0.12)'
            } else {
                x.style.height = '0px';
                x.style.padding = '0px'
                x.style.width = '0px';
                x.style.boxShadow = 'none'
            }
        })

        Pink.classList.remove("activePriority");
        Black.classList.remove("activePriority");
        Green.classList.remove("activePriority");
        Blue.classList.remove("activePriority");

        selector.classList.add("activePriority");
    }

}

resetBtn.addEventListener("click",function(){
    taskArr = [];
    localStorage.setItem("allTask", JSON.stringify(taskArr));
    window.location.reload();
})







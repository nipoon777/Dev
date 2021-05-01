let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main-container");
let body = document.body;
let plusBtn = document.querySelector(".fa-plus");
let crossBtn = document.querySelector(".fa-times");

crossBtn.addEventListener("click", setDeleteState);
plusBtn.addEventListener("click", createElem);
let deleteState = false;

let ticketArr = [];

if (localStorage.getItem("allTask")) {
    ticketArr = JSON.parse(localStorage.getItem("allTask"));
    //For UI
    ticketArr.forEach(ticket => {
        let { id, color, content } = ticket;
        addTicket(color, content, false, id);
    });
    
}


for(let i = 0 ; i < colorBtn.length ; i++ ){
    
    colorBtn[i].addEventListener("click", function(e){
        console.log("Event", e);
        let color = colorBtn[i].classList[2];
        mainContainer.style.backgroundColor = color;
    });
}
function createElem() {
    let modalContainer = document.querySelector(".modal_container");
    if(modalContainer == null){
        modalContainer = document.createElement("div");
        modalContainer.setAttribute("class", "modal_container");

        modalContainer.innerHTML = `
        <div class="input_container">
        <textarea class = "input_box" placeholder="Enter text here"></textarea>

        </div>
        <div class="filter_container">
            <div class="filter_modal pink"></div>
            <div class="filter_modal blue"></div>
            <div class="filter_modal green"></div>
            <div class="filter_modal black"></div>

        </div>
        </div>
        `;
        body.appendChild(modalContainer);
        handleModal(modalContainer);
    }
    let inputBox = modalContainer.querySelector(".input_box");
    inputBox.value = "";
    
}
function handleModal( modalContainer ){
    let filterContainer = document.querySelectorAll(".filter_modal");

    let defaultColor = "black";

    filterContainer[3].classList.add("border");

    
    for(let i = 0 ; i < filterContainer.length ; i++ ){
        filterContainer[i].addEventListener("click",function(){
            filterContainer.forEach( colorElem => {
                 colorElem.classList.remove("border");
            });
            filterContainer[i].classList.add("border");
            defaultColor = filterContainer[i].classList[1];
        });
    }
    let textArea = document.querySelector(".input_box");
    
    textArea.addEventListener("keydown", function(e){
        if(e.key == "Enter" && textArea.value != ""){
            let content = textArea.value;
            modalContainer.remove();
            addTicket(defaultColor, content, true);

        }
    })
}
function addTicket(color, content, flag, id){
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket_container");

    let uidFuntn = new ShortUniqueId();
    let uid = id || uidFuntn();
    ticketContainer.innerHTML = `
            <div class="priority_bar ${color} ">
            </div>
            <div class="desc_container">
                <h3 class="uid">#${uid}</h3>
                <div class="desc" contenteditable="true">
                    ${content}
                </div>
            </div>
    `
    mainContainer.appendChild(ticketContainer);
    

    let piorityBar = ticketContainer.querySelector(".priority_bar"); 
    // Jo ticket banaya hai uska priroty bar leke aajao

    if(flag){
        let ticketObj = {"content" : content, "id" : `${uid}`, "color" : color};
        ticketArr.push(ticketObj);
        let finalArr = JSON.stringify(ticketArr);
        localStorage.setItem("allTask", finalArr);
    }

    piorityBar.addEventListener("click", changeColor);
    ticketContainer.addEventListener("click", deleteTask);

    let taskDec = ticketContainer.querySelector(".desc");

    taskDec.addEventListener("keypress", editTask);
}
function changeColor(e){
        let colors = ["pink", "blue", "green", "black"];
        console.log("Entered function");
        let piorityBar = e.currentTarget;
        let currColor = piorityBar.classList[1];
        let idx = colors.indexOf(currColor);
        let newColorIdx = (idx + 1) % 4;
        piorityBar.classList.remove(currColor);
        piorityBar.classList.add(colors[newColorIdx]);

}
function setDeleteState(e) {
    let crossBtn = e.currentTarget;

    let parent = crossBtn.parentNode;

    if(deleteState == false){
        parent.classList.add("active");
    }else{
        parent.classList.remove("active");
    }
    deleteState = !deleteState;
}
function deleteTask(e){
    let taskContainer = e.currentTarget;
    if(deleteState) {
        //Remove from the local storage
        let uidElem = taskContainer.querySelector(".uid");
        let uid = uidElem.innerText.split("#")[1];
        for (let index = 0; index < ticketArr.length; index++) {
            let { id } = ticketArr[index];

            if( id == uid){
                ticketArr.splice(index, 1);
                let finalArr = JSON.stringify(ticketArr);
                localStorage.setItem("allTask", finalArr);
                taskContainer.remove();
                break;
            }
            
        }       
    }
}

function editTask(e){
    let taskDec = e.currentTarget;
    let uidElem = taskDec.parentNode.children[0];

    let uid = uidElem.innerText.split("#")[1];
    
    for (let index = 0; index < ticketArr.length; index++) {
        let { id } = ticketArr[index];
        if( id == uid ){
            ticketArr[index].content = taskDec.innerText;
            let finalTaskArr = JSON.stringify(ticketArr);
            localStorage.setItem("allTask", finalTaskArr);

            break;
        }
        
    }
}
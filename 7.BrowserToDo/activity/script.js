let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main-container");

let body = document.body;
let plusBtn = document.querySelector(".fa-plus");
console.log(colorBtn[0]);

for(let i = 0 ; i < colorBtn.length ; i++ ){
    
    colorBtn[i].addEventListener("click", function(e){
        console.log("Event", e);
        let color = colorBtn[i].classList[2];
        mainContainer.style.backgroundColor = color;
    });
}

plusBtn.addEventListener("click", createElem);

function createElem() {
    let modalContainer = document.createElement("div");
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
            addTicket(defaultColor, content);

        }
    })
}

function addTicket(color, content){
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class", "ticket_container");
    ticketContainer.innerHTML = `
            <div class="priority_bar ${color} ">

            </div>
            <div class="desc_container">
                <h3 class="uid">#example</h3>
                <div class="desc">
                    ${content}
                </div>
            </div>
    `
    mainContainer.appendChild(ticketContainer);

}
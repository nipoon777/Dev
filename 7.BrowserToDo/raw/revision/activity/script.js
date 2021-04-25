let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let body = document.body;

let plusBtn = document.querySelector(".fa-plus");

colorBtn.forEach(color => {
    color.addEventListener("click", function(e){
        console.log(e);
        let bgColor = color.classList[2];
        mainContainer.style.backgroundColor = bgColor;
    });
});

/* <div class="task_box">
            <div class="input_section">
                <textarea class ="input_box" placeholder="Enter your text here"></textarea>
            </div>
            <div class="color_selector">
                <!-- <div class="color_filter"> -->
                    <div class="color pink #d24d57"></div>
                    <div class="color blue #00b16a"></div>
                    <div class="color green #86e2d5"></div>
                    <div class="color black #24252a"></div>
                <!-- </div> -->
                <!-- <div class="color_filter">
                    
                </div>
                <div class="color_filter">
                    
                </div>
                <div class="color_filter">
                </div> -->
            </div>
        </div> */

plusBtn.addEventListener("click", createTaskBox);

function createTaskBox(){
    console.log("Entered the function");
    let task_box = document.createElement("div");
    task_box.setAttribute("class", "task_box");

    task_box.innerHTML = ` <div class="input_section">
                <textarea class ="input_box" 
                placeholder="Enter your text here"></textarea>
            </div>
            <div class="color_selector">
                    <div class="color pink #d24d57"></div>
                    <div class="color blue #00b16a"></div>
                    <div class="color green #86e2d5"></div>
                    <div class="color black #24252a"></div>
                    
                </div>
            </div>
    `;
    body.appendChild(task_box);

    //Add event listener to each color

    handleTask(task_box);
}

function handleTask(task_box){
    let headColor = "black";

    let taskFilters = document.querySelectorAll(".color");

    taskFilters[3].classList.add("border");

    for( let i = 0 ; i < taskFilters.length ; i++ ){
        taskFilters[i].addEventListener("click", function(){
            //Remove border from all elements
            taskFilters.forEach(taskColor => {
                taskColor.classList.remove("border");
            });

            //Add to the selected element
            taskFilters[i].classList.add("border");

            headColor = taskFilters[i].classList[1];
            console.log("Current color of task is", headColor);
        });
    }
    let textArea = document.querySelector(".input_box");
    textArea.addEventListener("keydown", function(e){
        if(e.key == "Enter" && textArea.value != ""){
            let content = textArea.value;
            console.log("Task", textArea.value, "color", headColor);
            task_box.remove();
            createTicket(headColor, content);
        }
    });
}

function createTicket(color,content){
    let ticketContainer = document.createElement("div");
    ticketContainer.setAttribute("class","ticket_container");
    ticketContainer.innerHTML =`
    <div class="ticket_container">
            <div class="ticket_filter ${color}">

            </div>
            <div class="ticket_desc_container">
                <h3 class="uid">#example</h3>
                <div class="ticket_desc">
                    ${content}
                </div>
            </div>

        </div>
    `;
    mainContainer.appendChild(ticketContainer);

}
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
                    <div class="color pink"></div>
                    <div class="color blue"></div>
                    <div class="color green"></div>
                    <div class="color black"></div>
                <!-- </div> -->
                <!-- <div class="color_filter">
                    
                </div>
                <div class="color_filter">
                    
                </div>
                <div class="color_filter">
                </div> -->
            </div>
        </div> */

plusBtn.addEventListener("click", function(){
    console.log("Entered the function");
    let task_box = document.createElement("div");
    task_box.setAttribute("class", "task_box");

    task_box.innerHTML = ` <div class="input_section">
                <textarea class ="input_box" 
                placeholder="Enter your text here"></textarea>
            </div>
            <div class="color_selector">
                    <div class="color pink"></div>
                    <div class="color blue"></div>
                    <div class="color green"></div>
                    <div class="color black"></div>
                    
                </div>
            </div>
    `;

    body.appendChild(task_box);
});

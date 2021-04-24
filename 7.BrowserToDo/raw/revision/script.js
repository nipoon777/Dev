let input = document.querySelector(".input_box");
let ul = document.querySelector(".task-list");

input.addEventListener("keydown", function(e){
    console.log("Event", e);

    if(e.key == "Enter"){
        /* 
            Create a new Node li
            Add task value to data
            Add child to ul;
        */
        let task = input.value;
        let li = document.createElement("li");
        /* 
            Add event to each li element 
        */
        li.addEventListener("dblclick", function(e){
            li.remove();
        })
        li.innerText = task; 
        li.setAttribute("class","task");
        ul.appendChild(li);
        input.value = "";

    }
})
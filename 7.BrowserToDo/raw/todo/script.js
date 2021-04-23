let input = document.querySelector(".input_box");
let ul = document.querySelector(".task-list");

input.addEventListener("keydown", function(e){
    console.log("Event object", e);

    if(e.key == "Enter"){
        let task = input.value;
        console.log(task);
        //Create my HTML task

        let li = document.createElement("li");

        li.addEventListener("dblclick", function(e){
            console.log(e);
            li.remove();
        });

        li.innerText = task;
        li.setAttribute("class", "task");

        ul.appendChild(li);

        input.value = "";

    }
});
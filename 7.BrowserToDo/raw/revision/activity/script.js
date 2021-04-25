let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");

colorBtn.forEach(color => {
    color.addEventListener("click", function(e){
        console.log(e);
        let bgColor = color.classList[2];
        mainContainer.style.backgroundColor = bgColor;
    });
});

/* for(let i = 0 ; i < colorBtn.length ; i++ ){
    
    colorBtn[i].addEventListener("click", function(e){
        console.log("Event", e);
        let color = colorBtn[i].classList[2];
        mainContainer.style.backgroundColor = color;
    });
} */
let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main-container");
 
console.log(colorBtn[0]);

for(let i = 0 ; i < colorBtn.length ; i++ ){
    
    colorBtn[i].addEventListener("click", function(e){
        console.log("Event", e);
        let color = colorBtn[i].classList[2];
        mainContainer.style.backgroundColor = color;
    });
}
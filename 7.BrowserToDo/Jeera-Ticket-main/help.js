let helper = document.querySelector(".helper");
let one = document.querySelector(".priorityHelper");
let sec = document.querySelector(".addBtnHelper");
let third = document.querySelector(".addDivHelper");
let fourth = document.querySelector(".crossBtnHelper");
let fifth = document.querySelector(".resetHelper");
let cover = document.querySelector(".cover")

helpBtn.addEventListener("click", function(){
    helper.style.display = "block";
    one.style.display = "flex";
})

one.querySelector("i").addEventListener('click',function(){
    one.style.display = "none";
    sec.style.display = "flex";
})
sec.querySelector("i").addEventListener('click',function(){
    sec.style.display = "none";
    third.style.display = "flex";
    container.style.width = "60%"
    cover.style.width = "60%"
    popUp.style.right = "0%";
})
third.querySelector("i").addEventListener('click',function(){
    third.style.display = "none";
    fourth.style.display = "flex";
    container.style.width = "100%"
    cover.style.width = "100%"
    popUp.style.right = "-40%";
})
fourth.querySelector("i").addEventListener('click',function(){
    fourth.style.display = "none";
    fifth.style.display = "flex";
})
fifth.querySelector(".fa-arrow-right").addEventListener('click',function(){
    fifth.style.display = "none";
    helper.style.display = "none";
})




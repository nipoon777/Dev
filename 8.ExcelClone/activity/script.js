let addBtn = document.querySelector(".add_container");
let sheetList = document.querySelector(".sheets_list");
let firstSheet = document.querySelector(".sheet");

firstSheet.addEventListener("click", handleActiveSheet);

addBtn.addEventListener("click",addSheet);

function addSheet(){
    console.log("Working");
    let sheetArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetArr[sheetArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheet_Idx");

    idx = Number(idx);

    let newSheet = document.createElement("div");

    newSheet.setAttribute("class","sheet");
    newSheet.setAttribute("sheet_Idx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 1}`;

    sheetList.appendChild(newSheet);
    newSheet.addEventListener("click", handleActiveSheet);

}

function handleActiveSheet(e){
    let mySheet = e.currentTarget;
    let sheetsArr = document.querySelectorAll(".sheet");
    sheetsArr.forEach( function (sheet) {
        sheet.classList.remove("active_sheet");
    })
    if( !mySheet.classList[1]){
        mySheet.classList.add("active_sheet");
    }
}
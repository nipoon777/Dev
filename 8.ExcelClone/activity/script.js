let topRow = document.querySelector(".top-row");
let str = "";
for (let i = 0; i < 26; i++) {
    str += `<div class='col'>${String.fromCharCode(65 + i)}</div>`;
}
topRow.innerHTML = str;
let leftCol = document.querySelector(".left-col");
str = ""
for (let i = 0; i < 100; i++) {
    str += `<div class='left-col_box'>${i + 1}</div>`
}
leftCol.innerHTML = str;

// 2d array
let grid = document.querySelector(".grid");
str = "";
for (let i = 0; i < 100; i++) {
    str += `<div class="row">`
    for (let j = 0; j < 26; j++) {
        str += `<div class='col' rid = ${i} cid = ${j} contenteditable = "true"></div>`
    }
    str += "</div>";
}
grid.innerHTML = str;

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



let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address_box");
console.log(allCells);
allCells[0].click();


for(let i = 0 ; i < allCells.length ; i++){
    allCells[i].addEventListener("click", function handleCells(){
        let rid = Number(allCells[i].getAttribute("rid"));
        let cid = Number(allCells[i].getAttribute("cid"));
    
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
    
        let address = colAdd + rowAdd;
        addressBar.value = address;
    });
}


let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");

let alignMentContainer = document.querySelector(".alignment_container");

alignMentContainer.addEventListener("click", handleAlignment);

function handleAlignment(e){
    let target = e.path[0].classList[0];
    let address = addressBar.value;
    let { rid, cid} = getRowIdAndColId(address);
    let cell = document.querySelector(`.col[ rid = "${rid}"][ cid = "${cid}"]`);
    if( target == "left"){
        cell.style.textAlign = "left";
    }else if( target == "right"){
        cell.style.textAlign = "right";
    }else{
        cell.style.textAlign = "center";
    }
}

function getRowIdAndColId(address){
    let cellColAdr = address.charCodeAt(0);
    let cid = cellColAdr - 65;

    let rid = Number(address.slice(1)) - 1;
    
    return { cid, rid};

}

let fontBtn = document.querySelector(".font_family");

fontBtn.addEventListener("change", handleChangeFont);

function handleChangeFont(){
    let fontStyle = fontBtn.value;
    let address = addressBar.value;

    let { rid, cid} = getRowIdAndColId(address);
    console.log(rid,cid);
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
console.log(cell);
    cell.style.fontFamily = fontStyle;
}
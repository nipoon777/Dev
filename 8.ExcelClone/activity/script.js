/* 
    Create Sheets and Add functionality to sheets;
*/

let addBtn = document.querySelector(".add_container");
let sheetList = document.querySelector(".sheets_list");
let firstSheet = document.querySelector(".sheet");
let fontBtn = document.querySelector(".font_family");
let sizeBtn = document.querySelector(".font_size");
let colorBtn = document.querySelector(".color");
let bgColorBtn = document.querySelector(".bg_color");
let boldBtn = document.querySelector(".bold");
let italicBtn = document.querySelector(".italic");
let unBtn = document.querySelector(".underline");
let formattingContainer = document.querySelector(".formatting_container");
let allCells = document.querySelectorAll(".grid .col");
let addressBar = document.querySelector(".address_box");
let leftBtn = document.querySelector(".left");
let centerBtn = document.querySelector(".center");
let rightBtn = document.querySelector(".right");
let alignMentContainer = document.querySelector(".alignment_container");
let alignment = document.querySelectorAll(".alignment_container>*");

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

/* 
    Address Bar Function adding event Listener to all the cells

*/


for(let i = 0 ; i < allCells.length ; i++){
    allCells[i].addEventListener("click", function handleCells(){
        let rid = Number(allCells[i].getAttribute("rid"));
        let cid = Number(allCells[i].getAttribute("cid"));
        
        let rowAdd = rid + 1;
        let colAdd = String.fromCharCode(cid + 65);
        
        let address = colAdd + rowAdd;
        addressBar.value = address;
        let cellObj = sheetDB[rid][cid];

        if( cellObj.bold ){
            boldBtn.classList.add("active_btn");
        }else{
            boldBtn.classList.remove("active_btn");
        }

        if( cellObj.italic ){
            italicBtn.classList.add("active_btn");
        }else{
            italicBtn.classList.remove("active_btn");
        }

        if( cellObj.underline ){
            unBtn.classList.add("active_btn");
        }else{
            unBtn.classList.remove("active_btn");
        }

        colorBtn.value = cellObj.color;
        bgColorBtn.value = cellObj.bgColor;
        sizeBtn.value = cellObj.fontSize;
        fontBtn.value = cellObj.fontFamily;

        /* 
        Alingment container
        */
       alignment.forEach( (element) => {
            element.classList.remove("active_btn");
       });

       if( cellObj.halign == "left"){
           leftBtn.classList.add("active_btn");
       }else if( cellObj.halign == "center"){
           centerBtn.classList.add("active_btn");
       }else if( cellObj.halign == "right"){
           rightBtn.classList.add("active_btn");
       }
        
    });
}
allCells[0].click();

/* 
    Alignment Functionality 
    L-C-R
*/


alignMentContainer.addEventListener("click", handleAlignment);

function handleAlignment(e){
    let target = e.path[0].classList[0];
    let address = addressBar.value;
    let { rid, cid} = getRowIdAndColId(address);
    let cell = document.querySelector(`.col[ rid = "${rid}"][ cid = "${cid}"]`);
    let cellObj = sheetDB[rid][cid];

    alignment.forEach( (element) => {
        element.classList.remove("active_btn");
    });
    
    if( target == "left"){
        cell.style.textAlign = "left";
        leftBtn.classList.add("active_btn");
        cellObj.halign = "left";

    }else if( target == "right"){
        cell.style.textAlign = "right";
        rightBtn.classList.add("active_btn");
        cellObj.halign = "right";
    }else{
        cell.style.textAlign = "center";
        centerBtn.classList.add("active_btn");
        cellObj.halign = "center";
    }
}

function getRowIdAndColId(address){
    let cellColAdr = address.charCodeAt(0);
    let cid = cellColAdr - 65;

    let rid = Number(address.slice(1)) - 1;
    
    return { cid, rid};

}

/* 
    Adding functionality to FontFamily and size;
*/

formattingContainer.addEventListener("click", handleClickEvents);
formattingContainer.addEventListener("change", handleChangeEvents);

function handleClickEvents(e){
    let target = e.path[0].classList[0];
    console.log(target);
    let address = addressBar.value;
    let { rid, cid } = getRowIdAndColId(address);

    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    let cellObj = sheetDB[rid][cid];
    if(target == "bold"){
        let isActive = boldBtn.classList.contains("active_btn");
        console.log(isActive);
        if(isActive){
            cell.style.fontWeight = "normal";
            boldBtn.classList.remove("active_btn");
            cellObj.bold = false;
        }else{
            cell.style.fontWeight = "bold";
            boldBtn.classList.add("active_btn");
            cellObj.bold = true;
        }
    }else if(target == "italic"){
        let isActive = italicBtn.classList.contains("active_btn");
        console.log(isActive);
        if(isActive){
            cell.style.fontStyle = "normal";
            italicBtn.classList.remove("active_btn");
            cellObj.italic = false;
        }else{
            cell.style.fontStyle = "italic";
            italicBtn.classList.add("active_btn");
            cellObj.italic = true;
        }
    }else if(target == "underline"){
        let isActive = unBtn.classList.contains("active_btn");
        console.log(isActive);
        if(isActive){
            cell.style.textDecoration = "none";
            unBtn.classList.remove("active_btn");
            cellObj.underline = false;
        }else{
            cell.style.textDecoration = "underline";
            unBtn.classList.add("active_btn");
            cellObj.underline = true;
        }
    }
}

function handleChangeEvents(e){
    let target = e.path[0].classList[0];
    console.log(target);
    let address = addressBar.value;
    let { rid, cid } = getRowIdAndColId(address);
    let cell = document.querySelector(`.col[rid = "${rid}"][cid = "${cid}"]`);
    
    let cellObj = sheetDB[rid][cid];
    if(target == "font_family"){
        let fontStyle = fontBtn.value;
        cell.style.fontFamily = fontStyle;
        cellObj.fontFamily = fontStyle;
    }else if(target == "font_size"){
        let fontSize = sizeBtn.value;
        console.log(fontSize);
        cell.style.fontSize = fontSize +"px";
        cellObj.fontSize = fontSize;
    }else if(target == "color"){
        let colorVal = colorBtn.value;
        console.log(colorVal);
        cell.style.color = colorVal;
        cellObj.color = colorVal;
    }else if(target == "bg_color"){
        let bgColorVal = bgColorBtn.value;
        console.log(bgColorVal);
        cell.style.backgroundColor = bgColorVal;
        cellObj.bgColor = bgColorVal;
    }
}





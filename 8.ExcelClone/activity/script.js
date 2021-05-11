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
let sheetDB = workSheetDB[0];
let formulaInput = document.querySelector(".formula_box");
/* 
    Create Sheets and Add functionality to sheets;
*/

firstSheet.addEventListener("click", handleActiveSheet);
addBtn.addEventListener("click",addSheet);

function addSheet(){
    let sheetArr = document.querySelectorAll(".sheet");
    let lastSheetElem = sheetArr[sheetArr.length - 1];
    let idx = lastSheetElem.getAttribute("sheet_Idx");

    idx = Number(idx);

    let newSheet = document.createElement("div");

    newSheet.setAttribute("class","sheet");
    newSheet.setAttribute("sheet_Idx", idx + 1);
    newSheet.innerText = `Sheet ${idx + 1}`;

    sheetList.appendChild(newSheet);
    //db mai bhi update karo
    sheetArr.forEach( (sheet) => {
        sheet.classList.remove("active_sheet");
    });
    sheetArr= document.querySelectorAll(".sheet");
    sheetArr[sheetArr.length - 1].classList.add("active_sheet");
    //Initialise New Sheet
    initCurrentSheetDb();

    sheetDB = workSheetDB[idx];
    initUI();

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
    let sheetIdx = mySheet.getAttribute("sheet_Idx");
    sheetDB = workSheetDB[sheetIdx - 1];
    
    setUI(sheetDB);
}

/*  Initialise UI for all cells */
function initUI(){
    for( let i = 0 ; i < allCells.length ; i++){
        allCells[i].style.fontWeight = "normal";
        allCells[i].style.fontStyle = "normal";
        allCells[i].style.textDecoration = "none";
        allCells[i].style.fontFamily = "Arial";
        allCells[i].style.fontSize = "16px";
        allCells[i].style.textAlign = "left";
        allCells[i].innerText = "";

    }
    allCells[0].click();
}

/* 
    Set the UI for all Cells
*/

function setUI(sheetDB){
    for( let i = 0 ; i < sheetDB.length ; i++ ){
        for( let j = 0 ; j < sheetDB[i].length ; j++){
            let cell = document.querySelector(`.col[rid="${i}"][cid="${j}"]`);
            let { bold, 
                italic, 
                underline,
                halign, 
                fontFamily,
                fontSize,
                color,
                bgColor,
                value 
            } = sheetDB[i][j];
            cell.style.fontWeight = bold ? "bold" : "normal";
            cell.style.fontStyle = italic ? "italic" :"normal";
            cell.style.halign = halign;
            cell.style.textDecoration = underline ? "underline" : "none";
            cell.style.fontFamily = fontFamily;
            cell.style.color = color;
            cell.style.fontSize = fontSize;
            cell.style.backgroundColor = bgColor;
            cell.innerText = value;
        }

    
    }
    
}
/* 
    To store what is added in a cell
*/

for( let i = 0 ;i < allCells.length ; i++){
    allCells[i].addEventListener("blur", handleCellData);
}

function handleCellData(){
    let address = addressBar.value;
    let { rid, cid } = getRowIdAndColId(address);
    let cellObj = sheetDB[rid][cid];
    let cell = document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`);
    cellObj.value = cell.innerText;
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

/* 
    Formula Section 
*/

formulaInput.addEventListener("keydown", function(e){
    if( e.key == "Enter" && formulaInput.value != ""){
        let newformula = formulaInput.value;
        let address = addressBar.value;
        let { rid, cid } = getRowIdAndColId(address);
        // let cellObj = sheetDB[rid][cid];
        let evaluatedVal = evaluateFormula(newformula);

        setUIByFormula(evaluatedVal, rid, cid);
        // DB Update;
        setFormula(evaluatedVal, newformula, rid, cid, address);
        
    }
});
function setFormula(evaluatedVal, newformula, rid, cid, address){
    let cellObj = sheetDB[rid][cid];
    cellObj.value = evaluatedVal;
    cellObj.formula = newformula;
    let formulaTokens = newformula.split(" ");
    for (let index = 0; index < formulaTokens.length; index++) {
        let firstCharOfToken = formulaTokens[index].charCodeAt(0);
        if( firstCharOfToken >= 'A' && firstCharOfToken <= 'Z'){
            let parentRIDCID = getRowIdAndColId(formulaTokens[index]);
            let cellObj = sheetDB[parentRIDCID.rid][parentRIDCID.cid];
            cellObj.children.push(address);
        }
    }
}
function evaluateFormula(newformula){
    let formula = newformula.split(" ");

    for( let i = 0 ; i < formula.length ; i++ ){
        let firstCharOfToken = formula[i].charCodeAt(0);

        if( firstCharOfToken >= 'A' && firstCharOfToken <= 'Z'){
            let { rid, cid } = getRowIdAndColId(formula[i]);
            // console.log(rid, cid);
            let cellObj = sheetDB[rid][cid];

            let { value } = cellObj;
            // console.log(value);
            newformula = newformula.replace(formula[i], value);
        }
    }

    let ans = eval(newformula);
    console.log(ans);
    return ans;
}

function setUIByFormula( evaluatedVal, rid, cid ){
    document.querySelector(`.col[rid="${rid}"][cid="${cid}"]`).innerText = evaluatedVal;
}

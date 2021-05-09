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

/* 
    2D sheet DB to track all the styling applied to a cell
*/
let sheetDB = [];

for( let i = 0 ; i < 100 ; i++){
    let cell =[];
    for( let j = 0 ; j < 26 ; j++){
        let cellObj = {
            bold : false,
            italic : false,
            underline : false,
            halign : "left",
            fontFamily : "Arial",
            fontSize : "10",
            color : "",
            bgColor : ""
        }
        cell.push(cellObj);
    }
    sheetDB.push(cell);
}
console.log(sheetDB);

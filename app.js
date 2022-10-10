const saveBtn = document.querySelector("#save-btn");
const textInput = document.querySelector(".input");
const fileInput = document.querySelector("#file");
const eraserBtn = document.querySelector("#eraser-btn");
const initBtn = document.querySelector("#init-btn");
const fillBtn = document.querySelector("#fill-btn");
const colorOption = Array.from(document.querySelectorAll(".color-option"));
// document.method: HtmlCollection -> Array.from change,
// a lot of class -> querySelectorAll 
const color = document.querySelector("#color");
const canvas = document.querySelector("canvas");
const lineWidth = document.querySelector("#line-width");
// brush
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

// moveTo: 좌표이동
/*context.moveTo(50, 50);
context.lineTo(150, 50);
context.lineTo(150, 150);
context.lineTo(50, 150);
context.lineTo(50, 50); 
context.stroke(); === rect()**/
/*
context.fillRect(230, 200, 15, 100); //armL
context.fillRect(305, 200, 15, 100); //body
context.fillRect(250, 200, 50, 100); //armR
context.fillRect(250, 300, 20, 100); //legL
context.fillRect(280, 300, 20, 100); //legR
context.fillRect(245, 200, 5, 10); //shoulderL
context.fillRect(300, 200, 5, 10); //shoulderR

context.arc(275, 170, 30, 0, 2*Math.PI); //head
context.fill();

context.beginPath();
context.fillStyle = "blue";
context.arc(265, 160, 5, 0, 2*Math.PI); //eyeL
context.arc(285, 160, 5, 0, 2*Math.PI); //eyeR
context.fill();
**/


// Math.random(): 무작위 수
// Math.floor(): 올림
context.lineCap = "round";
context.lineWidth = lineWidth.value;
let isPainting = false;
let isFilling = false;


// JS always gives event, event takes many info
function onMouseMove(event) {
    if (isPainting) {
        context.lineTo(event.offsetX, event.offsetY);
        context.stroke();
        return;
    }
    context.moveTo(event.offsetX, event.offsetY);

}

function startPaint() {
    isPainting = true;
}

function cancelPaint() {
    isPainting = false;
    context.beginPath(); // paint가 끝날 때 새 경로
}

function lineWidthChange(event) {
    context.lineWidth = event.target.value;
}
// rangebox color
function colorChange(event) {
    context.strokeStyle = event.target.value;
    context.fillStyle = event.target.value;
}
//example painting board color
function colorClick(event) {
    context.strokeStyle = event.target.dataset.color;
    context.fillStyle = event.target.dataset.color;
    color.value = event.target.dataset.color;
}

// Default: false = 그리기 모드
function onFillClick() {
    if (isFilling) {
        isFilling = false;
        fillBtn.innerText = "Fill"; // changing btn use boolean
    }
    else {
        isFilling = true;
        fillBtn.innerText = "Draw";
    }
}
// isFilling = true : 채우기 모드
function onCanvasClick() {
    if (isFilling) {
        context.fillRect(0, 0, 800, 800);
    }
}

function init() {
    context.fillStyle = "white";
    context.fillRect(0, 0, 800, 800);
}

function eraserClick() {
    context.strokeStyle = "white";
    isFilling = false;
    fillBtn.innerText = "Fill";
}

function fileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    const image = new Image(); // === <img src=""
    image.src = url;
    image.onload = function () {
        context.drawImage(image, 0, 0);
        fileInput.value = null;
    }
}

function onDoubleClick(event) {
    const text = textInput.value;
    if (text !== "") {
        context.save(); // All Select of context saved 
        context.lineWidth = 1;
        context.font = "30px ,Georgia"
        context.strokeText(text, event.offsetX, event.offsetY);
        context.restore();
    }// Saved context changed 

}

function saveClick() {
    const url = canvas.toDataURL(); // base64 string
    const a = document.createElement("a");
    a.href = url;
    a.download = "img.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", cancelPaint);
canvas.addEventListener("mouseleave", cancelPaint);
// bug canvas를 벗어났을 때 마우스를 누른 상태로
// 벗어나서 mouseup()이 실행이 안됨 -> mouseleave()를 사용
lineWidth.addEventListener("change", lineWidthChange);
color.addEventListener("change", colorChange);
// Color board
console.log(colorOption);
colorOption.forEach(color => color.addEventListener("click", colorClick));
// Fill
fillBtn.addEventListener("click", onFillClick);
canvas.addEventListener("click", onCanvasClick);
// Eraser
initBtn.addEventListener("click", init);
eraserBtn.addEventListener("click", eraserClick);
// file
fileInput.addEventListener("change", fileChange);

saveBtn.addEventListener("click", saveClick);
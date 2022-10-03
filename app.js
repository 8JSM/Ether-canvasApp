const colorOption = Array.from(document.querySelectorAll(".color-option"));
// document.method: HtmlCollection -> Array.from change
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
context.lineWidth = lineWidth.value;
let isPainting = false;
// JS always gives event, event takes many info
function onMouseMove(event) {
    if(isPainting){
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

function colorChange(event) {
    context.strokeStyle = event.target.value;
    context.fillStyle = event.target.value;
}

function colorClick(event) {
    context.strokeStyle = event.target.dataset.color;
    context.fillStyle = event.target.dataset.color;
    color.value = event.target.dataset.color;
}

canvas.addEventListener("mousemove", onMouseMove);
canvas.addEventListener("mousedown", startPaint);
canvas.addEventListener("mouseup", cancelPaint);
canvas.addEventListener("mouseleave", cancelPaint);
// bug canvas를 벗어났을 때 마우스를 누른 상태로
// 벗어나서 mouseup()이 실행이 안됨 -> mouseleave()를 사용
lineWidth.addEventListener("change", lineWidthChange);
color.addEventListener("change", colorChange);

console.log(colorOption);
colorOption.forEach(color => color.addEventListener("click", colorClick));
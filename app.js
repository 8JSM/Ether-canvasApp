const canvas = document.querySelector("canvas");

// brush
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
// moveTo: 좌표이동
/*context.moveTo(50, 50);
context.lineTo(150, 50);
context.lineTo(150, 150);
context.lineTo(50, 150);
context.lineTo(50, 50); === rect()**/

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

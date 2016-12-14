function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var m4 = twgl.m4;

  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;
  var slider3 = document.getElementById('slider3');
  slider3.value = 0;
  var slider4 = document.getElementById('slider4');
  slider4.value = 0;
  var slider5 = document.getElementById('slider5');
  slider5.value = 0;

  function moveToTx(x,y,z,Tx) {
    var loc = [x,y,z];
    var locTx = m4.transformPoint(Tx,loc);
    context.moveTo(locTx[0]+250,-locTx[1]+250);
  }

  function lineToTx(x,y,z,Tx) {
    var loc = [x,y,z];
    var locTx = m4.transformPoint(Tx,loc);
    context.lineTo(locTx[0]+250,-locTx[1]+250);
  }

  function drawAxes(Tx) {
    context.strokeStyle = "Black";
    // A little cross on the front face, for identification
    moveToTx(0,0,0,Tx);lineToTx(50,0,0,Tx);context.stroke();
    moveToTx(0,0,0,Tx);lineToTx(0,150,0,Tx);context.stroke();
    moveToTx(0,0,0,Tx);lineToTx(0,0,250,Tx);context.stroke();
  }

  function drawBoxOutline(Tx) {

    //FRONT
    context.beginPath();
    context.strokeStyle = "Black";
    context.fillStyle = "#d5d5d5"
    moveToTx(0,0,0,Tx);
    lineToTx(0,100,0,Tx);
    lineToTx(100,100,0,Tx);
    lineToTx(100,0,0,Tx);
    lineToTx(0,0,0,Tx);
    context.closePath();
    context.stroke();
    context.fill();

    //RIGHT
    context.beginPath();
    moveToTx(100,0,0,Tx);
    lineToTx(100,100,0,Tx);
    lineToTx(100,100,100,Tx);
    lineToTx(100,0,100,Tx);
    lineToTx(100,0,0,Tx);
    context.closePath();
    context.stroke();
    context.fill();

    //LEFT
    context.beginPath();
    moveToTx(0,0,0,Tx);
    lineToTx(0,100,0,Tx);
    lineToTx(0,100,100,Tx);
    lineToTx(0,0,100,Tx);
    lineToTx(0,0,0,Tx);
    context.closePath();
    context.stroke();
    context.fill();
    //TOP
    context.beginPath();
    moveToTx(0,0,0,Tx);
    lineToTx(100,0,0,Tx);
    lineToTx(100,0,100,Tx);
    lineToTx(0,0,100,Tx);
    lineToTx(0,0,0,Tx);
    context.closePath();
    context.stroke();
    context.fill();
    //Bottom
    context.beginPath();
    moveToTx(0,100,0,Tx);
    lineToTx(100,100,0,Tx);
    lineToTx(100,100,100,Tx);
    lineToTx(0,100,100,Tx);
    lineToTx(0,100,0,Tx);
    context.closePath();
    context.stroke();
    context.fill();
  }
  function drawHead(Tx) {

    //FRONT
    context.beginPath();
   
   context.strokeStyle = "Black";
    context.fillStyle = "#1e5d88";
    moveToTx(-25,0,-25,Tx);
    lineToTx(-25,50,-25,Tx);
    lineToTx(25,50,-25,Tx);
    lineToTx(25,0,-25,Tx);
    context.closePath();
    context.fill();
    context.stroke();
    //RIGHT
    context.beginPath();
    moveToTx(25,0,-25,Tx);
    lineToTx(25,50,-25,Tx);
    lineToTx(25,50,25,Tx);
    lineToTx(25,0,25,Tx);
    context.closePath();
    context.fill();
    context.stroke();

    //LEFT
    context.beginPath();
    moveToTx(-25,0,-25,Tx);
    lineToTx(-25,50,-25,Tx);
    lineToTx(-25,50,25,Tx);
    lineToTx(-25,0,25,Tx);
    context.closePath();
    context.fill();
    context.stroke();

	
    //TOP
    context.beginPath();
    moveToTx(-25,50,-25,Tx);
    lineToTx(-25,50,25,Tx);
    lineToTx(25,50,25,Tx);
    lineToTx(25,50,-25,Tx);
    context.closePath();
    context.fill();
    context.stroke();

    //Bottom
    context.beginPath();
    moveToTx(-25,0,-25,Tx);
    lineToTx(-25,0,25,Tx);
    lineToTx(25,0,25,Tx);
    lineToTx(25,0,-25,Tx);
    context.closePath();
    context.fill();
    context.stroke();
  }
  function drawArm(Tx){
  
  	
    context.beginPath();
    context.strokeStyle = "Black";
    context.fillStyle = "#55ad7a";
    //bottom
    moveToTx(10,-10,-10,Tx);
    lineToTx(10,-10,10,Tx);
    lineToTx(-10,-10,10,Tx);
    lineToTx(-10,-10,-10,Tx);
    lineToTx(10,-10,-10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
    
    
    //top
    context.beginPath();
    moveToTx(10,90,-10,Tx);
    lineToTx(10,90,10,Tx);
    lineToTx(-10,90,10,Tx);
    lineToTx(-10,90,-10,Tx);
    lineToTx(10,90,-10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
    
    
    //Right
    context.beginPath();
    moveToTx(10,-10,-10,Tx);lineToTx(10,90,-10,Tx);lineToTx(10,90,10,Tx);lineToTx(10,-10,10,Tx);lineToTx(10,-10,-10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
   // Back
   context.beginPath();
    moveToTx(10,-10,10,Tx);lineToTx(10,90,10,Tx);lineToTx(-10,90,10,Tx);lineToTx(-10,-10,10,Tx);lineToTx(10,-10,10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
    //Left
    context.beginPath();
    moveToTx(-10,-10,10,Tx);lineToTx(-10,90,10,Tx);lineToTx(-10,90,-10,Tx);lineToTx(-10,-10,-10,Tx);lineToTx(-10,-10,10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
	//Front
	context.beginPath();
    moveToTx(-10,-10,-10,Tx);lineToTx(-10,90,-10,Tx);lineToTx(10,90,-10,Tx);lineToTx(10,-10,-10,Tx);
     context.closePath();
    context.fill();
    context.stroke();

  
  }
  function drawLeg(Tx){
  
  	
    context.beginPath();
    context.strokeStyle = "Black";
    context.fillStyle = "#334d5c";
    //bottom
    moveToTx(10,-10,-10,Tx);
    lineToTx(10,-10,10,Tx);
    lineToTx(-10,-10,10,Tx);
    lineToTx(-10,-10,-10,Tx);
    lineToTx(10,-10,-10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
    
    
    //top
    context.beginPath();
    moveToTx(10,90,-10,Tx);
    lineToTx(10,90,10,Tx);
    lineToTx(-10,90,10,Tx);
    lineToTx(-10,90,-10,Tx);
    lineToTx(10,90,-10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
    
    
    //Right
    context.beginPath();
    moveToTx(10,-10,-10,Tx);lineToTx(10,90,-10,Tx);lineToTx(10,90,10,Tx);lineToTx(10,-10,10,Tx);lineToTx(10,-10,-10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
   // Back
   context.beginPath();
    moveToTx(10,-10,10,Tx);lineToTx(10,90,10,Tx);lineToTx(-10,90,10,Tx);lineToTx(-10,-10,10,Tx);lineToTx(10,-10,10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
    //Left
    context.beginPath();
    moveToTx(-10,-10,10,Tx);lineToTx(-10,90,10,Tx);lineToTx(-10,90,-10,Tx);lineToTx(-10,-10,-10,Tx);lineToTx(-10,-10,10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
	//Front
	context.beginPath();
    moveToTx(-10,-10,-10,Tx);lineToTx(-10,90,-10,Tx);lineToTx(10,90,-10,Tx);lineToTx(10,-10,-10,Tx);
     context.closePath();
    context.fill();
    context.stroke();
    
    //Shoe
    //Bottom
    context.beginPath();
    moveToTx(-10,90,-10,Tx);lineToTx(10,90,-10,Tx);lineToTx(10,90,-20,Tx);lineToTx(-10,90,-20,Tx);
    context.closePath();
    context.fill();
    context.stroke();
    
    //Top
    context.beginPath();
    moveToTx(-10,80,-10,Tx);lineToTx(-10,80,-20,Tx);lineToTx(10,80,-20,Tx);lineToTx(10,80,-10,Tx);
    context.closePath();
    context.fill();
    context.stroke();
    
    //Right
    context.beginPath();
    moveToTx(-10,90,-10,Tx);lineToTx(-10,90,-20,Tx);lineToTx(-10,80,-20,Tx);lineToTx(-10,80,-10,Tx);
    context.closePath();
    context.fill();
    context.stroke();
    
    //Left;
    context.beginPath();
    moveToTx(10,90,-10,Tx);lineToTx(10,90,-20,Tx);lineToTx(10,80,-20,Tx);lineToTx(10,80,-10,Tx);
    context.closePath();
    context.fill();
    context.stroke();
  
  }


  function draw() {
    // hack to clear the canvas fast
    canvas.width = canvas.width;

    var angle1 = slider1.value*0.01*Math.PI;
    var angle2 = slider2.value*0.01*Math.PI;
    var axis = [1,1,1];

    var Tmodel=m4.axisRotation(axis,angle2);

    var eye=[500*Math.cos(angle1),200,500*Math.sin(angle1)];
    var target=[0,0,0];
    var up=[0,1,0];

    //NEEDS TO BE INVERSE when using lookAt
    var Tcamera=m4.inverse(m4.lookAt(eye,target,up));

    var Tmodelview=m4.multiply(Tmodel,Tcamera);

    drawBoxOutline(Tmodelview);

    var Theadview = m4.multiply(m4.translation([50,100,50]), Tmodelview);
    var headRot = slider3.value*0.005*Math.PI;
    var Theadviewrotate = m4.multiply(m4.rotationY(headRot), Theadview);
    var scale1 = m4.multiply(m4.scaling([1,1,1]),Theadviewrotate);
    drawHead(scale1);

    var rightArmView = m4.multiply(m4.translation([110,50,50]), Tmodelview);
    var rightArmRotVal = slider4.value*0.005*Math.PI;
    var rightArmRot = m4.multiply(m4.rotationX(rightArmRotVal), rightArmView);
    drawArm(rightArmRot);
    
    var leftArmView = m4.multiply(m4.translation([-10,50,50]), Tmodelview);
    var leftArmRotVal = slider5.value*0.005*Math.PI;
    var leftArmRot = m4.multiply(m4.rotationX(leftArmRotVal), leftArmView);
    drawArm(leftArmRot);
    
    var rightLegView = m4.multiply(m4.translation([110,10,50]), Tmodelview);
    var flipRight = m4.multiply(m4.rotationX(Math.PI),rightLegView);
    var rightLegRotVal = slider6.value*0.005*Math.PI;
    var rightLegRot = m4.multiply(m4.rotationX(rightLegRotVal), flipRight);
    drawLeg(rightLegRot);
    
    var leftLegView = m4.multiply(m4.translation([-10,10,50]), Tmodelview);
    var flipLeft = m4.multiply(m4.rotationX(Math.PI),leftLegView);
    var leftLegRotVal = slider7.value*0.005*Math.PI;
    var leftLegRot = m4.multiply(m4.rotationX(leftLegRotVal), flipLeft);
    drawLeg(leftLegRot);

  }

  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  slider3.addEventListener("input",draw);
  slider4.addEventListener("input",draw);
  slider5.addEventListener("input",draw);
  slider6.addEventListener("input",draw);
  slider7.addEventListener("input",draw);
  draw();

}
window.onload = setup;

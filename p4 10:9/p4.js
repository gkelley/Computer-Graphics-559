function setup() { "use strict";
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var m4 = twgl.m4;

  //Camera Toggle
  var redBox = document.getElementById('redBox');
  var slider1 = document.getElementById('slider1');
  slider1.value = 0;
  var slider2 = document.getElementById('slider2');
  slider2.value = 0;
  var slider3 = document.getElementById('slider3');
  slider3.value = 0;
  var slider8 = document.getElementById('slider8'); //FOV
  slider8.value = 80;
  var slider9 = document.getElementById('slider9'); //LookAtX
  slider9.value = 0;
  var slider10 = document.getElementById('slider10'); //Y
  slider10.value = 0;
  var slider11 = document.getElementById('slider11'); //Z
  slider11.value = 0;
  var slider12 = document.getElementById('slider12'); //LookFromX
  slider12.value = 0;
  var slider13 = document.getElementById('slider13'); //Y
  slider13.value = 0;
  var slider14 = document.getElementById('slider14'); //Z
  slider14.value = 0;

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

  //Stores all trangles that will be drawn
  var triangles = [];

  //Method intializes all triangles
  function initGeometry(){
      //Castle

      //Back Left
      triangles.push([[0,0,0],[10,0,0],[0,50,0],"#4e42f4",0.0]);
      triangles.push([[0,50,0],[10,0,0],[10,50,0],"#4e42f4",0.0]);
      triangles.push([[5,65,0],[0,50,0],[10,50,0],"#d85d6b",0.0]);
      //Front Left
      triangles.push([[0,0,20],[10,0,20],[0,50,20],"#4e42f4",0.0]);
      triangles.push([[0,50,20],[10,0,20],[10,50,20],"#4e42f4",0.0]);
      triangles.push([[5,65,20],[0,50,20],[10,50,20],"#d85d6b",0.0]);
      //Right Left
      triangles.push([[10,0,0],[10,0,20],[10,50,0],"#4e42f4",0.0]);
      triangles.push([[10,50,20],[10,50,0],[10,0,20],"#4e42f4",0.0]);
      triangles.push([[10,50,20],[10,50,0],[5,65,10],"#d85d6b",0.0]);
      //Right Right
      triangles.push([[0,0,0],[0,0,20],[0,50,0],"#4e42f4",0.0]);
      triangles.push([[0,50,20],[0,50,0],[0,0,20],"#4e42f4",0.0]);
      triangles.push([[0,50,20],[0,50,0],[5,65,10],"#d85d6b",0.0]);


      //Back Right
      triangles.push([[0+150,0,0],[10+150,0,0],[0+150,50,0],"#4e42f4",0.0]);
      triangles.push([[0+150,50,0],[10+150,0,0],[10+150,50,0],"#4e42f4",0.0]);
      triangles.push([[5+150,65,0],[0+150,50,0],[10+150,50,0],"#d85d6b",0.0]);
      //Front Right
      triangles.push([[0+150,0,20],[10+150,0,20],[0+150,50,20],"#4e42f4",0.0]);
      triangles.push([[0+150,50,20],[10+150,0,20],[10+150,50,20],"#4e42f4",0.0]);
      triangles.push([[5+150,65,20],[0+150,50,20],[10+150,50,20],"#d85d6b",0.0]);
      //Right Right
      triangles.push([[10+150,0,0],[10+150,0,20],[10+150,50,0],"#4e42f4",0.0]);
      triangles.push([[10+150,50,20],[10+150,50,0],[10+150,0,20],"#4e42f4",0.0]);
      triangles.push([[10+150,50,20],[10+150,50,0],[5+150,65,10],"#d85d6b",0.0]);
      //Right Right
      triangles.push([[0+150,0,0],[0+150,0,20],[0+150,50,0],"#4e42f4",0.0]);
      triangles.push([[0+150,50,20],[0+150,50,0],[0+150,0,20],"#4e42f4",0.0]);
      triangles.push([[0+150,50,20],[0+150,50,0],[5+150,65,10],"#d85d6b",0.0]);

      //center back
      triangles.push([[10,0,0],[10,40,0],[60,0,0],"#c5d8f7",0.0]);
      triangles.push([[10,40,0],[60,40,0],[60,0,0],"#c5d8f7",0.0]);

      triangles.push([[100,40,0],[150,40,0],[100,0,0],"#c5d8f7",0.0]);
      triangles.push([[100,0,0],[150,0,0],[150,40,0],"#c5d8f7",0.0]);

      triangles.push([[60,40,0],[100,40,0],[80,35,0],"#4e42f4",0.0]);
      triangles.push([[60,25,0],[60,40,0],[80,35,0],"#d85d6b",0.0]);
      triangles.push([[100,40,0],[80,35,0],[100,25,0],"#d85d6b",0.0]);

      //center Front
      triangles.push([[10,0,20],[10,40,20],[60,0,20],"#e8f0ff",0.0]);
      triangles.push([[10,40,20],[60,40,20],[60,0,20],"#e8f0ff",0.0]);

      triangles.push([[100,40,20],[150,40,20],[100,0,20],"#e8f0ff",0.0]);
      triangles.push([[100,0,20],[150,0,20],[150,40,20],"#e8f0ff",0.0]);

      triangles.push([[60,40,20],[100,40,20],[80,35,20],"#4e42f4",0.0]);
      triangles.push([[60,25,20],[60,40,20],[80,35,20],"#d85d6b",0.0]);
      triangles.push([[100,40,20],[80,35,20],[100,25,20],"#d85d6b",0.0]);

      // //center TOP
      // triangles.push([[10,40,0],[150,40,0],[150,40,20],"black",0.0]);
      // triangles.push([[10,40,20],[10,40,0],[150,40,20],"black",0.0]);

      //Pyramid
      triangles.push([[100,0+10,50+0],[200,0+10,50+0],[150,100+10,50+50],"brick",0.0,"lux"]);
      triangles.push([[200,0+10,50+0],[200,0+10,50+100],[150,100+10,50+50],"brick",0.0,"lux"]);
      triangles.push([[200,0+10,50+100],[150,100+10,50+50],[100,0+10,50+100],"brick",0.0,"lux"]);
      triangles.push([[100,0+10,50+100],[100,0+10,50+0],[150,100+10,50+50],"brick",0.0,"lux"]);

      // //Pyramid
      // triangles.push([[100-160,0+10,50+0-100],[200-160,0+10,50+0-100],[150-160,100+10,50+50-100],"brick",0.0,"lux"]);
      // triangles.push([[200-160,0+10,50+0-100],[200-160,0+10,50+100-100],[150-160,100+10,50+50-100],"brick",0.0,"lux"]);
      // triangles.push([[200-160,0+10,50+100-100],[150-160,100+10,50+50-100],[100-160,0+10,50+100-100],"brick",0.0,"lux"]);
      // triangles.push([[100-160,0+10,50+100-100],[100-160,0+10,50+0-100],[150-160,100+10,50+50-100],"brick",0.0,"lux"]);

      //Trump Tower
      //front
      triangles.push([[80,0,0+170],[30,0,0+170],[80,50,0+170],"gold",0.0]);
      triangles.push([[30,0,0+170],[30,50,0+170],[80,50,0+170],"gold",0.0]);
      triangles.push([[30,50,0+170],[80,50,0+170],[30,60,0+170],"gray",0.0]);
      triangles.push([[30,60,0+170],[80,60,0+170],[80,50,0+170],"gray",0.0]);
      //back
      triangles.push([[80,0,0+200],[30,0,0+200],[80,50,0+200],"gold",0.0]);
      triangles.push([[30,0,0+200],[30,50,0+200],[80,50,0+200],"gold",0.0]);
      triangles.push([[30,50,0+200],[80,50,0+200],[30,60,0+200],"gray",0.0]);
      triangles.push([[30,60,0+200],[80,60,0+200],[80,50,0+200],"gray",0.0]);
      //Right
      triangles.push([[80,0,0+200],[80,50,0+200],[80,50,0+170],"gold",0.0]);
      triangles.push([[80,0,0+170],[80,0,0+200],[80,50,0+170],"gold",0.0]);
      triangles.push([[80,50,0+200],[80,60,0+200],[80,60,0+170],"gray",0.0]);
      triangles.push([[80,50,0+170],[80,60,0+170],[80,50,0+200],"gray",0.0]);
      //Left
      triangles.push([[80-50,0,0+200],[80-50,50,0+200],[80-50,50,0+170],"gold",0.0]);
      triangles.push([[80-50,0,0+170],[80-50,0,0+200],[80-50,50,0+170],"gold",0.0]);
      triangles.push([[80-50,50,0+200],[80-50,60,0+200],[80-50,60,0+170],"gray",0.0]);
      triangles.push([[80-50,50,0+170],[80-50,60,0+170],[80-50,50,0+200],"gray",0.0]);









      //Floor Pattern
      for(var i = 0; i < 10; i++){
        var z = i * 20;
        for(var k = 0; k < 10; k++){
          var x = k*20;
          var col1 = parseInt(Math.random() * 255);
          var col2 = parseInt(Math.random() * 255);
          var col3 = parseInt(Math.random() * 255);


          triangles.push([[x,-20,z],[x+20,-20,z],[x,-20,z+20],"rgb("+col1+","+col2+","+col3+")",0.0]);//Left
          triangles.push([[x,-20,z+20],[x+20,-20,z+20],[x+20,-20,z],"rgb("+col2+","+col1+","+col3+")",0.0]);//Right
        }
      }

  }
  //Draws a Triangle to Screen
  //Triangle Struct: First Point - Second Point - Third Point - Color - Order
  function drawTriangle(triangle, Tx){
    context.beginPath();
    context.strokeStyle="white";
    if(redBox.checked){ //Adds color based off distance
      context.fillStyle = "rgb("+Math.floor(-triangle[4]*0.4)+",40,200)"
    }
    else{
      if(triangle[3] == "brick"){
        var img=document.getElementById("brick");
        var pat=context.createPattern(img,"repeat");
        context.fillStyle=pat;
      }
      if(triangle[3] == "gold"){
        var img=document.getElementById("gold");
        var pat=context.createPattern(img,"repeat");
        context.fillStyle=pat;
      }
      else{
        context.fillStyle=triangle[3];
      }

    }
    if(triangle[5] == "lux"){
      var scaleLux = slider3.value * .005;
      Tx = m4.multiply(m4.scaling([1,1+scaleLux,1]),Tx);

    }
    // var rot = slider1.value*0.005*Math.PI;
    // var Trotview = m4.multiply(m4.rotationY(rot),Tx)
    moveToTx(triangle[0][0],triangle[0][1],triangle[0][2],Tx);
    lineToTx(triangle[1][0],triangle[1][1],triangle[1][2],Tx);
    lineToTx(triangle[2][0],triangle[2][1],triangle[2][2],Tx);
    context.closePath();
    context.stroke();
    context.fill();
  }
  function myFunction() {
    alert('Hello');
}
  //Loops through all triangles and draws them
  function drawWorld(Tx){
    bubbleSort(triangles);
    for(var i=0;i<triangles.length;i++){
       drawTriangle(triangles[i],Tx), 3000;
     }
  }

//http://www.stoimen.com/blog/2010/07/09/friday-algorithms-javascript-bubble-sort/
  function bubbleSort(arr)
    {
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < arr.length-1; i++) {
            if (arr[i][4] > arr[i+1][4]) {
                var temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
  }

  function drawBoxOutline(Tx) {

    // [[0,0,0],[0,100,0],[100,100,0]] // THIS WOULD BE ONE TRIANGE?????
    // [[100,100,0],[100,0,0],[0,0,0]] //Another
    //combine into one list or stack with all box triangles


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


    //RIGHT
    context.beginPath();
    moveToTx(100,0,0,Tx);
    lineToTx(100,100,0,Tx);
    lineToTx(100,100,100,Tx);
    lineToTx(100,0,100,Tx);
    lineToTx(100,0,0,Tx);
    context.closePath();
    context.stroke();


    //LEFT
    context.beginPath();
    moveToTx(0,0,0,Tx);
    lineToTx(0,100,0,Tx);
    lineToTx(0,100,100,Tx);
    lineToTx(0,0,100,Tx);
    lineToTx(0,0,0,Tx);
    context.closePath();
    context.stroke();

    //TOP
    context.beginPath();
    moveToTx(0,0,0,Tx);
    lineToTx(100,0,0,Tx);
    lineToTx(100,0,100,Tx);
    lineToTx(0,0,100,Tx);
    lineToTx(0,0,0,Tx);
    context.closePath();
    context.stroke();

    //Bottom
    context.beginPath();
    moveToTx(0,100,0,Tx);
    lineToTx(100,100,0,Tx);
    lineToTx(100,100,100,Tx);
    lineToTx(0,100,100,Tx);
    lineToTx(0,100,0,Tx);
    context.closePath();
    context.stroke();

  }


/*
1. Transform Draw Methods into Init Methods
  -These Methods will create arrays with the [x,y,z] coords and return a lists of arrays for the specific body parseInt
2. Combine all body part arrays into one big list of arrays
3. Do a prespective transformation to all points ?? Where do i do this
4. Order the points using painters algo (in draw method)
5. Loop through massive list and draw farthest first
  -Need a method to draw based a triangle from an array of 3 items
*/



  function draw() {
    // hack to clear the canvas fast
    canvas.width = canvas.width;

    var angle1 = slider1.value*0.01*Math.PI;
    var angle2 = slider2.value*0.01*Math.PI;
    var axis = [1,1,1];
    var Tmodelrot=m4.axisRotation(axis,angle2);
    var rot = slider1.value*0.005*Math.PI;
    var Tmodel = m4.multiply(m4.rotationY(rot),Tmodelrot);

    var eye=[0+ parseInt(slider9.value),200+ parseInt(slider10.value),500+ parseInt(slider11.value)]; //LOOK From
    var target=[100+ parseInt(slider12.value),0 + parseInt(slider13.value),100 + parseInt(slider14.value)]; //LOOK At
    var up=[0,1,0]; //Direction

    var fov = parseInt(slider8.value)/180*Math.PI;
    var Tprojection = m4.perspective((-Math.PI / 4) + fov, 1, 2, 2000);

    var Tviewport=m4.multiply(m4.scaling([200,200,200]),m4.translation([0,0,0])); //WHY NOT -200 for middle val
    //Do we scale because it was 1,1,1 cube

    //NEEDS TO BE INVERSE when using lookAt
    var Tcamera=m4.inverse(m4.lookAt(eye,target,up)); //EXPLAIN ORDER OF THESE Multiplications?
    var Tcpv=m4.multiply(m4.multiply(Tcamera,Tprojection),Tviewport);
    var Tmc=m4.multiply(Tmodel,Tcamera);
    var Tmodelview=m4.multiply(Tmodel,Tcpv);


    for(var i=0;i<triangles.length;i++){
      var cam=m4.transformPoint(Tmc,triangles[i][1]);
      triangles[i][4] = cam[2];

    }



    drawWorld(Tmodelview);


    //drawBoxOutline(Tmodelview);

  }

  redBox.addEventListener("click", draw);
  slider1.addEventListener("input",draw);
  slider2.addEventListener("input",draw);
  slider3.addEventListener("input",draw);
  slider8.addEventListener("input",draw);
  slider9.addEventListener("input",draw);
  slider10.addEventListener("input",draw);
  slider11.addEventListener("input",draw);
  slider12.addEventListener("input",draw);
  slider13.addEventListener("input",draw);
  slider14.addEventListener("input",draw);

  initGeometry();
  draw();

}
window.onload = setup;

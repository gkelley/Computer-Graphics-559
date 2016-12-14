// draw a textured cube using WebGL
//
// written by sifakis on October 18, 2015

function start() { "use strict";

    // Get canvas, WebGL context, twgl.m4
    var canvas = document.getElementById("mycanvas");
    var gl = canvas.getContext("webgl");
    var m4 = twgl.m4;
    var v3 = twgl.v3;

    // Sliders at center
    var slider1 = document.getElementById('slider1');
    slider1.value = 0;
    var slider2 = document.getElementById('slider2');
    slider2.value = 0;

    // Read shader source
    var vertexSource = document.getElementById("vs").text;
    var fragmentSource = document.getElementById("fs").text;

    // Compile vertex shader
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader,vertexSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(vertexShader)); return null; }

    // Compile fragment shader
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader,fragmentSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(fragmentShader)); return null; }

    // Attach the shaders and link
    var shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert("Could not initialize shaders"); }
    gl.useProgram(shaderProgram);

    // with the vertex shader, we need to pass it positions
    // as an attribute - so set up that communication
    shaderProgram.PositionAttribute = gl.getAttribLocation(shaderProgram, "vPosition");
    gl.enableVertexAttribArray(shaderProgram.PositionAttribute);

    shaderProgram.ColorAttribute = gl.getAttribLocation(shaderProgram, "vColor");
    gl.enableVertexAttribArray(shaderProgram.ColorAttribute);

    shaderProgram.NormalAttribute = gl.getAttribLocation(shaderProgram, "vNormal");
    gl.enableVertexAttribArray(shaderProgram.NormalAttribute);

    // this gives us access to the matrix uniform
    shaderProgram.MVPmatrix = gl.getUniformLocation(shaderProgram,"uMVP");
    shaderProgram.Normalmatrix = gl.getUniformLocation(shaderProgram,"normalMatrix");

    // Data ...

    var vertexPos = new Float32Array ([
      //Luxor
       100.0/500.0,10.0/500.0,50.0/500.0, 200.0/500.0,10.0/500.0,50.0/500.0, 150.0/500.0,110.0/500.0,100.0/500.0,
       200.0/500.0,10.0/500.0,50.0/500.0, 200.0/500.0,10.0/500.0,150.0/500.0, 150.0/500.0,110.0/500.0,100.0/500.0,
       200.0/500.0,10.0/500.0,150.0/500.0, 150.0/500.0,110.0/500.0,100.0/500.0, 100.0/500.0,10.0/500.0,150.0/500.0,
       100.0/500.0,10.0/500.0,150.0/500.0, 100.0/500.0,10.0/500.0,50.0/500.0,  150.0/500.0,110.0/500.0,100.0/500.0,

       //floor
       100.0/500.0,10.0/500.0,50.0/500.0, 200.0/500.0,10.0/500.0,50.0/500.0, 100.0/500.0,10.0/500.0,150.0/500.0,
       100.0/500.0,10.0/500.0,150.0/500.0, 200.0/500.0,10.0/500.0,50.0/500.0, 200.0/500.0,10.0/500.0,150.0/500.0,


      //Trump Tower
      80.0/500.0,0.0/500.0,170.0/500.0, 30.0/500.0,0.0/500.0,170.0/500.0, 80.0/500.0,50.0/500.0,170.0/500.0,
      30.0/500.0,0.0/500.0,170.0/500.0, 30.0/500.0,50.0/500.0,170.0/500.0, 80.0/500.0,50.0/500.0,170.0/500.0,
      30.0/500.0,50.0/500.0,170.0/500.0, 80.0/500.0,50.0/500.0,170.0/500.0, 30.0/500.0,60.0/500.0,170.0/500.0,
      30.0/500.0,60.0/500.0,170.0/500.0, 80.0/500.0,60.0/500.0,170.0/500.0, 80.0/500.0,50.0/500.0,170.0/500.0,

      80.0/500.0,0.0/500.0,200.0/500.0, 30.0/500.0,0.0/500.0,200.0/500.0, 80.0/500.0,50.0/500.0,200.0/500.0,
      30.0/500.0,0.0/500.0,200.0/500.0, 30.0/500.0,50.0/500.0,200.0/500.0, 80.0/500.0,50.0/500.0,200.0/500.0,
      30.0/500.0,50.0/500.0,200.0/500.0, 80.0/500.0,50.0/500.0,200.0/500.0, 30.0/500.0,60.0/500.0,200.0/500.0,
      30.0/500.0,60.0/500.0,200.0/500.0, 80.0/500.0,60.0/500.0,200.0/500.0, 80.0/500.0,50.0/500.0,200.0/500.0,

      80.0/500.0,0.0/500.0,200.0/500.0, 80.0/500.0,50.0/500.0,200.0/500.0, 80.0/500.0,50.0/500.0,170.0/500.0,
      80.0/500.0,0.0/500.0,170.0/500.0, 80.0/500.0,0.0/500.0,200.0/500.0, 80.0/500.0,50.0/500.0,170.0/500.0,
      80.0/500.0,50.0/500.0,200.0/500.0, 80.0/500.0,60.0/500.0,200.0/500.0, 80.0/500.0,60.0/500.0,170.0/500.0,
      80.0/500.0,50.0/500.0,170.0/500.0, 80.0/500.0,60.0/500.0,170.0/500.0, 80.0/500.0,50.0/500.0,200.0/500.0,

      30.0/500.0,0.0/500.0,200.0/500.0, 30.0/500.0,50.0/500.0,200.0/500.0, 30.0/500.0,50.0/500.0,170.0/500.0,
      30.0/500.0,0.0/500.0,170.0/500.0, 30.0/500.0,0.0/500.0,200.0/500.0, 30.0/500.0,50.0/500.0,170.0/500.0,
      30.0/500.0,50.0/500.0,200.0/500.0, 30.0/500.0,60.0/500.0,200.0/500.0, 30.0/500.0,60.0/500.0,170.0/500.0,
      30.0/500.0,50.0/500.0,170.0/500.0, 30.0/500.0,60.0/500.0,170.0/500.0, 30.0/500.0,50.0/500.0,200.0/500.0,

      //roof and floor
      30.0/500.0,60.0/500.0,200.0/500.0, 80.0/500.0,60.0/500.0,200.0/500.0, 30.0/500.0,60.0/500.0,170.0/500.0,
      30.0/500.0,60.0/500.0,170.0/500.0, 80.0/500.0,60.0/500.0,170.0/500.0, 80.0/500.0,60.0/500.0,200.0/500.0,
      30.0/500.0,0.0/500.0,200.0/500.0, 80.0/500.0,0.0/500.0,200.0/500.0, 30.0/500.0,0.0/500.0,170.0/500.0,
      30.0/500.0,0.0/500.0,170.0/500.0, 80.0/500.0,0.0/500.0,170.0/500.0, 80.0/500.0,0.0/500.0,200.0/500.0,
      //72


      //Excalabar
      //back
      //Back Left
    0.0/500.0,0.0/500.0,0.0/500.0,          10.0/500.0,0.0/500.0,0.0/500.0,         0.0/500.0,50.0/500.0,0.0/500.0,
    0.0/500.0,50.0/500.0,0.0/500.0,10.0/500.0,0.0/500.0,0.0/500.0,10.0/500.0,50.0/500.0,0.0/500.0,
    5.0/500.0,65.0/500.0,0.0/500.0,0.0/500.0,50.0/500.0,0.0/500.0,10.0/500.0,50.0/500.0,0.0/500.0,
    //Front Left
    0.0/500.0,0.0/500.0,20.0/500.0,10.0/500.0,0.0/500.0,20.0/500.0,0.0/500.0,50.0/500.0,20.0/500.0,
    0.0/500.0,50.0/500.0,20.0/500.0,10.0/500.0,0.0/500.0,20.0/500.0,10.0/500.0,50.0/500.0,20.0/500.0,
    5.0/500.0,65.0/500.0,20.0/500.0,0.0/500.0,50.0/500.0,20.0/500.0,10.0/500.0,50.0/500.0,20.0/500.0,
    //Right Left
    10.0/500.0,0.0/500.0,0.0/500.0,10.0/500.0,0.0/500.0,20.0/500.0,10.0/500.0,50.0/500.0,0.0/500.0,
    10.0/500.0,50.0/500.0,20.0/500.0,10.0/500.0,50.0/500.0,0.0/500.0,10.0/500.0,0.0/500.0,20.0/500.0,
    10.0/500.0,50.0/500.0,20.0/500.0,10.0/500.0,50.0/500.0,0.0/500.0,5.0/500.0,65.0/500.0,10.0/500.0,
    //Right Right
    0.0/500.0,0.0/500.0,0.0/500.0,0.0/500.0,0.0/500.0,20.0/500.0,0.0/500.0,50.0/500.0,0.0/500.0,
    0.0/500.0,50.0/500.0,20.0/500.0,0.0/500.0,50.0/500.0,0.0/500.0,0.0/500.0,0.0/500.0,20.0/500.0,
    0.0/500.0,50.0/500.0,20.0/500.0,0.0/500.0,50.0/500.0,0.0/500.0,5.0/500.0,65.0/500.0,10.0/500.0,


    //Back Right
    150.0/500.0,0.0/500.0,0.0/500.0,160.0/500.0,0.0/500.0,0.0/500.0,150.0/500.0,50.0/500.0,0.0/500.0,
    150.0/500.0,50.0/500.0,0.0/500.0,160.0/500.0,0.0/500.0,0.0/500.0,160.0/500.0,50.0/500.0,0.0/500.0,
    155.0/500.0,65.0/500.0,0.0/500.0,150.0/500.0,50.0/500.0,0.0/500.0,160.0/500.0,50.0/500.0,0.0/500.0,
    //Front Right
    150.0/500.0,0.0/500.0,20.0/500.0,160.0/500.0,0.0/500.0,20.0/500.0,150.0/500.0,50.0/500.0,20.0/500.0,
    150.0/500.0,50.0/500.0,20.0/500.0,160.0/500.0,0.0/500.0,20.0/500.0,160.0/500.0,50.0/500.0,20.0/500.0,
    155.0/500.0,65.0/500.0,20.0/500.0,150.0/500.0,50.0/500.0,20.0/500.0,160.0/500.0,50.0/500.0,20.0/500.0,
    //Right Right
    160.0/500.0,0.0/500.0,0.0/500.0,160.0/500.0,0.0/500.0,20.0/500.0,160.0/500.0,50.0/500.0,0.0/500.0,
    160.0/500.0,50.0/500.0,20.0/500.0,160.0/500.0,50.0/500.0,0.0/500.0,160.0/500.0,0.0/500.0,20.0/500.0,
    160.0/500.0,50.0/500.0,20.0/500.0,160.0/500.0,50.0/500.0,0.0/500.0,155.0/500.0,65.0/500.0,10.0/500.0,
    //Right Right
    150.0/500.0,0.0/500.0,0.0/500.0,150.0/500.0,0.0/500.0,20.0/500.0,150.0/500.0,50.0/500.0,0.0/500.0,
    150.0/500.0,50.0/500.0,20.0/500.0,150.0/500.0,50.0/500.0,0.0/500.0,150.0/500.0,0.0/500.0,20.0/500.0,
    150.0/500.0,50.0/500.0,20.0/500.0,150.0/500.0,50.0/500.0,0.0/500.0,155.0/500.0,65.0/500.0,10.0/500.0,

    //center back
    10.0/500.0,0.0/500.0,0.0/500.0,10.0/500.0,40.0/500.0,0.0/500.0,60.0/500.0,0.0/500.0,0.0/500.0,
    10.0/500.0,40.0/500.0,0.0/500.0,60.0/500.0,40.0/500.0,0.0/500.0,60.0/500.0,0.0/500.0,0.0/500.0,

    100.0/500.0,40.0/500.0,0.0/500.0,150.0/500.0,40.0/500.0,0.0/500.0,100.0/500.0,0.0/500.0,0.0/500.0,
    100.0/500.0,0.0/500.0,0.0/500.0,150.0/500.0,0.0/500.0,0.0/500.0,150.0/500.0,40.0/500.0,0.0/500.0,

    60.0/500.0,40.0/500.0,0.0/500.0,100.0/500.0,40.0/500.0,0.0/500.0,80.0/500.0,35.0/500.0,0.0/500.0,
    60.0/500.0,25.0/500.0,0.0/500.0,60.0/500.0,40.0/500.0,0.0/500.0,80.0/500.0,35.0/500.0,0.0/500.0,
    100.0/500.0,40.0/500.0,0.0/500.0,80.0/500.0,35.0/500.0,0.0/500.0,100.0/500.0,25.0/500.0,0.0/500.0,

    //center Front
    10.0/500.0,0.0/500.0,20.0/500.0,10.0/500.0,40.0/500.0,20.0/500.0,60.0/500.0,0.0/500.0,20.0/500.0,
    10.0/500.0,40.0/500.0,20.0/500.0,60.0/500.0,40.0/500.0,20.0/500.0,60.0/500.0,0.0/500.0,20.0/500.0,

    100.0/500.0,40.0/500.0,20.0/500.0,150.0/500.0,40.0/500.0,20.0/500.0,100.0/500.0,0.0/500.0,20.0/500.0,
    100.0/500.0,0.0/500.0,20.0/500.0,150.0/500.0,0.0/500.0,20.0/500.0,150.0/500.0,40.0/500.0,20.0/500.0,

    60.0/500.0,40.0/500.0,20.0/500.0,100.0/500.0,40.0/500.0,20.0/500.0,80.0/500.0,35.0/500.0,20.0/500.0,
    60.0/500.0,25.0/500.0,20.0/500.0,60.0/500.0,40.0/500.0,20.0/500.0,80.0/500.0,35.0/500.0,20.0/500.0,
    100.0/500.0,40.0/500.0,20.0/500.0,80.0/500.0,35.0/500.0,20.0/500.0,100.0/500.0,25.0/500.0,20.0/500.0

    //38 more tris
]);

    // vertex colors
    var vertexColors = new Float32Array ([

      //Luxor
        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,
        //floor
        0.0, 0.0, 0.0,  0.0, 0.0, 0.0,    0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,  0.0, 0.0, 0.0,    0.0, 0.0, 0.0,

      //Trump
        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        //roof
        0.0, 0.0, 0.0,  0.0, 0.0, 0.0,    0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,  0.0, 0.0, 0.0,    0.0, 0.0, 0.0,
        //floor
        0.0, 0.0, 0.0,  0.0, 0.0, 0.0,    0.0, 0.0, 0.0,
        0.0, 0.0, 0.0,  0.0, 0.0, 0.0,    0.0, 0.0, 0.0,

        //Excalabar
        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0,

        1.0, 0.0, 0.0,   1.0, 0.0, 0.0,   1.0, 0.0, 0.0,
        0.0, 1.0, 0.0,   0.0, 1.0, 0.0,   0.0, 1.0, 0.0,
        0.0, 0.0, 1.0,   0.0, 0.0, 1.0,   0.0, 0.0, 1.0,
        1.0, 1.0, 0.0,   1.0, 1.0, 0.0,   1.0, 1.0, 0.0

        ]);
    var vectorNorms = new Float32Array(810);

    for (var i = 0; i < 810; i=i+9) {
        var p1 = [vertexPos[i], vertexPos[i+1], vertexPos[i+2]];
        var p2 = [vertexPos[i+3], vertexPos[i+4], vertexPos[i+5]];
        var p3 = [vertexPos[i+6], vertexPos[i+7], vertexPos[i+8]];

        var u = [p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]];
        var v = [p3[0]-p1[0],p3[1]-p1[1],p3[2]-p1[2]];
        var crossProductVec1 = v3.cross(u, v);
        vectorNorms[i] = crossProductVec1[0];
        vectorNorms[i+1] = crossProductVec1[1];
        vectorNorms[i+2] = crossProductVec1[2];

        var u2 = [p1[0]-p2[0],p1[1]-p2[1],p1[2]-p2[2]];
        var v2 = [p3[0]-p2[0],p3[1]-p2[1],p3[2]-p2[2]];
        var crossProductVec2 = v3.cross(u2, v2);
        vectorNorms[i+3] = crossProductVec2[0];
        vectorNorms[i+4] = crossProductVec2[1];
        vectorNorms[i+5] = crossProductVec2[2];

        var u4 = [p1[0]-p3[0],p1[1]-p3[1],p1[2]-p3[2]];
        var v4 = [p2[0]-p3[0],p2[1]-p3[1],p2[2]-p3[2]];
        var crossProductVec4 = v3.cross(u4, v4);
        vectorNorms[i+6] = crossProductVec4[0];
        vectorNorms[i+7] = crossProductVec4[1];
        vectorNorms[i+8] = crossProductVec4[2];
    }


    // we need to put the vertices into a buffer so we can
    // block transfer them to the graphics hardware
    var trianglePosBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexPos, gl.STATIC_DRAW);
    trianglePosBuffer.itemSize = 3;
    trianglePosBuffer.numItems = 192;

    // a buffer for colors
    var colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertexColors, gl.STATIC_DRAW);
    colorBuffer.itemSize = 3;
    colorBuffer.numItems = 192;

       // a buffer for colors
    var normalBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vectorNorms, gl.STATIC_DRAW);
    normalBuffer.itemSize = 3;
    normalBuffer.numItems = 192;

    // Scene (re-)draw routine
    function draw() {

        // Translate slider values to angles in the [-pi,pi] interval
        var angle1 = slider1.value*0.01*Math.PI;
        var angle2 = slider2.value*0.01*Math.PI;

        // Circle around the y-axis
        var eye = [300*Math.sin(angle1)+parseInt(slider9.value),150.0+parseInt(slider10.value),300.0*Math.cos(angle1)+parseInt(slider11.value)];
        var target = [100+parseInt(slider12.value),40+parseInt(slider13.value),0+parseInt(slider14.value)];
        var up = [0,1,0];

        var tModel = m4.multiply(m4.scaling([500,500,500]),m4.axisRotation([1,1,1],angle2));
        var tCamera = m4.inverse(m4.lookAt(eye,target,up));

        var tModelView = m4.multiply(tModel,tCamera);
        var fov = parseInt(slider8.value)/180*Math.PI;
        var tProjection = m4.perspective((-Math.PI / 6) + fov,1,10,4000);

        var tMVP=m4.multiply(m4.multiply(tModel,tCamera),tProjection);

        // Clear screen, prepare for rendering
        gl.clearColor(0.2, 0.2, 0.4, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        // Set up uniforms & attributes
        gl.uniformMatrix4fv(shaderProgram.MVPmatrix,false,tMVP);
        gl.uniformMatrix4fv(shaderProgram.Normalmatrix,false,m4.inverse(m4.transpose(tModelView)));

        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(shaderProgram.ColorAttribute, colorBuffer.itemSize,
          gl.FLOAT,false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, trianglePosBuffer);
        gl.vertexAttribPointer(shaderProgram.PositionAttribute, trianglePosBuffer.itemSize,
          gl.FLOAT, false, 0, 0);
        gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
        gl.vertexAttribPointer(shaderProgram.NormalAttribute, normalBuffer.itemSize,
          gl.FLOAT, false, 0, 0);

	    // Do the drawing
        gl.drawArrays(gl.TRIANGLES, 0, trianglePosBuffer.numItems);
    }

    slider1.addEventListener("input",draw);
    slider2.addEventListener("input",draw);
    slider8.addEventListener("input",draw);
    slider9.addEventListener("input",draw);
    slider10.addEventListener("input",draw);
    slider11.addEventListener("input",draw);
    slider12.addEventListener("input",draw);
    slider13.addEventListener("input",draw);
    slider14.addEventListener("input",draw);
    draw();
}

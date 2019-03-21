var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

// alle bilder

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "sad.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeNorth.src = "pipeNorth.png";
pipeSouth.src = "pipeSouth.png";


// variabler

var gap = 85;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.3;

var score = 0;

// lyd

var fly = new Audio();
var scor = new Audio();

fly.src = "fly.mp3";
scor.src = "score.mp3";

// knapp



// pipeposisjoner

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// tegn bilder

function draw(){

    ctx.drawImage(bg,0,0);


    for(var i = 0; i < pipe.length; i++){

        constant = pipeNorth.height+gap;
        ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);

        pipe[i].x--;

        if( pipe[i].x == 125 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        // kræsj




    }

    ctx.drawImage(fg,0,cvs.height - fg.height);

    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    requestAnimationFrame(draw);

}

draw();
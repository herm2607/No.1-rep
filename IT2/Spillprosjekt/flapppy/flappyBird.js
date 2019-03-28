var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d")

// bildene som brukes i spillet

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "bird.png";
bg.src = "bg.png";
fg.src = "fg.png";
pipeNorth.src = "pipeNorth.png";
pipeSouth.src = "pipeSouth.png";


// Variabler som fastsetter lengde, gap, gravity osv. på pipene og fugl

var gap = 110;
var constant;

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

// Dette er lydfilene som skal spilles av når en tast trykkes.
// I tilleg til scorelyd når fuglen har passert enten pipeNorth eller pipeSouth

var fly = new Audio();
var scor = new Audio();

fly.src = "fly.mp3";
scor.src = "oof1.mp3";

// Når tast er trykket ned beveger fuglen seg oppover

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 37;
    fly.play();
}

// pipens koordinater

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// Her tegnes bildene. Feks X og Y posisjon og bredde og høyde

function draw(){

    ctx.drawImage(bg,0,0);


    for(var i = 0; i < pipe.length; i++){
        // Her tegner jeg pipeNorth og pipeSouth
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

        // Her oppdages kollisjonen hvis fuglen treffer enten pipeNorth eller pipeSouth

        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
            location.reload(); // reloader siden
        }

        if(pipe[i].x == 5){
            score++;
            scor.play();
        }


    }

    ctx.drawImage(fg,0,cvs.height - fg.height);
// her tegner jeg fuglen
    ctx.drawImage(bird,bX,bY);

    bY += gravity;

    ctx.fillStyle = "white";
    ctx.font = "40px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);

    // bruker denne funksjonen for å tegne ovennevnte på nytt konstant
    requestAnimationFrame(draw);

}

draw();
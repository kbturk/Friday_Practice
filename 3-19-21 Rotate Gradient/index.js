//Redoing the website http://almostcalm.com/
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let WIDTH = canvas.width = window.innerWidth;
let HEIGHT = canvas.height = window.innerHeight;

const color1 = "#ff00ff";
const color2 = "#00FFFF";

let cRadians = Math.PI/2;
let ccRadians = Math.PI*3/2;
let x = WIDTH/2;
let y = HEIGHT/2;
let dr = 0;
//Gradient function
function gradient(width, height, radians){
    let r = Math.sqrt(width**2+height**2)/2;
    const _x = Math.sin(radians)*r;
    const _y = Math.cos(radians)*r;
    let x0 = Math.min(Math.abs(_x), width/2);
    let y0 = Math.min(Math.abs(_y), height/2);
    if (_x < 0 ){
        x0 = - x0;
    }
    if (_y < 0){
        y0 = - y0;
    }

    return ctx.createLinearGradient(x0 + WIDTH/2, y0 + HEIGHT/2, -x0 + WIDTH/2, -y0 + HEIGHT/2);
}

function deltaRad(dx, dy){
    let cRad = Math.atan2(dy, dx)*.1; // 0.1 is the scale factor.
    return cRad;
};

function paintAPicture(dr){
    ctx.clearRect(0,0,WIDTH, HEIGHT);

    cRadians = (dr + cRadians)%(2*Math.PI);
    ccRadians = (ccRadians - dr)%(2*Math.PI);
    console.log(`clockwise radians: ${cRadians}, countercw: ${ccRadians}`)
    let shapeGradient = gradient(WIDTH, HEIGHT, cRadians);

    shapeGradient.addColorStop(0,color1);
    shapeGradient.addColorStop(1,color2);

    ctx.fillStyle = shapeGradient;
    ctx.fillRect(0,0, canvas.width, canvas.height);

    const cdiameter = Math.min(WIDTH, HEIGHT);

    ctx.beginPath();
    ctx.arc(WIDTH/2,HEIGHT/2,cdiameter/2,0,2*Math.PI);

    shapeGradient = gradient(cdiameter, cdiameter, ccRadians);
    shapeGradient.addColorStop(0,color1);
    shapeGradient.addColorStop(1,color2);
    ctx.fillStyle = shapeGradient;
    ctx.fill();
};

paintAPicture(dr);

function resizePicture(){
    WIDTH = canvas.width = window.innerWidth;
    HEIGHT = canvas.height = window.innerHeight;
    paintAPicture(dr);
}

window.onresize = resizePicture;

canvas.addEventListener('mousemove', e => {

    if (Math.abs(x - e.offsetX) > 30){
        paintAPicture(deltaRad(x - e.offsetX, y - e.offsetY));
        x = e.offsetX;


    }else if (Math.abs(y - e.offsetY) > 30){
        paintAPicture(deltaRad(x - e.offsetX, y - e.offsetY));
        y = e.offsetY;
    };

});
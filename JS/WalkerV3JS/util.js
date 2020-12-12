const c = document.getElementById("walk");
const cc = c.getContext("2d");

function evalDis(wX, wY, gX, gY){
    let a = Math.abs(wY - gY);
    let b = Math.abs(wX - gX);
    return parseFloat((Math.sqrt((a**2) + (b**2))).toFixed(2));
}

function draw(){
    fill(0, 0, c.width, c.height, "#1a1818");
}
function fill(lx, ty, w, h, c){
    cc.fillStyle = c;
    cc.fillRect(lx, ty, w, h);
}
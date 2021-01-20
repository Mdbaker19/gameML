const c = document.getElementById("w4");
const cc = c.getContext("2d");

function evalDis(wX, wY, gX, gY){
    let a = Math.abs(wY - gY);
    let b = Math.abs(wX - gX);
    return parseFloat((Math.sqrt((a**2) + (b**2))).toFixed(2));
}

function draw(){
    fill(0, 0, c.width, c.height, "#382f2f");
}
function fill(lx, ty, w, h, c){
    cc.fillStyle = c;
    cc.fillRect(lx, ty, w, h);
}

function random(base, top){
    // inclusive base, exclusive top
    return (~~(Math.random() * (top - base)) + base);
}

function randomColor(){
    let out = "#";
    const hex = [2, 3, 4, 5, 6, 7, 8, 9, "b", "c", "d", "e", "f", "g"];
    for(let i = 0; i < 6; i++){
        let r = random(0, hex.length);
        out+= hex[r];
    }
    return out;
}
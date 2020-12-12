const c = document.getElementById("walk");
const cc = c.getContext("2d");

const starterSpots = 50;
let favorite;
let children = [];

const target = new Goal(600, 550, 50);

init();
setInterval(init, 10999);
setInterval(load, 50);



function load (){
    draw();
    for(let i = 0; i < children.length; i++){
        children[i].show("#d23838");
        children[i].move(50);
    }
    favorite.show("#15beda");
    favorite.move(50);
    target.show("#ffffff");


    // console.log(favorite.decisions);



}


function init(){
    theSpawning(100);
}

function theSpawning(x){
    children = [];
    favorite = new Walker(starterSpots, starterSpots, 10);
    for(let i = 0; i < x; i++){
        let copy = new Walker(starterSpots, starterSpots, 10);
        children.push(copy);
    }
}











function draw(){
    fill(0, 0, c.width, c.height, "#1a1818");
}
function fill(lx, ty, w, h, c){
    cc.fillStyle = c;
    cc.fillRect(lx, ty, w, h);
}

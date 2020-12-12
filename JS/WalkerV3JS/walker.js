let genCount = 0;

const starterSpots = 50;
let favorite;
let favoritesBest;
let children = [];

const target = new Goal(600, 550, 50);

init();
setInterval(recallSpawn, 5000);
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

    favoritesBest = favorite.x.toFixed(1) + ", " + favorite.y.toFixed(1);
}

function recallSpawn(){
    getBestWalker(children);
    theSpawning(50);
    genCount++;
    document.getElementById("gen").innerText = genCount.toString();
    document.getElementById("best").innerText = favoritesBest;
}


function init(){
    theSpawning(50);
}

function theSpawning(x){
    children = [];
    favorite = new Walker(starterSpots, starterSpots, 10);
    for(let i = 0; i < x; i++){
        let copy = new Walker(starterSpots, starterSpots, 10);
        children.push(copy);
    }
}




function getBestWalker(arrOfWalkers){
    let allWalkersPositionsUponDeath = [];
    for(let i = 0; i < arrOfWalkers.length; i++){
        let coordinates = {
            id: i,
            x: parseFloat(arrOfWalkers[i].x.toFixed(1)),
            y: parseFloat(arrOfWalkers[i].y.toFixed(1))
        }
        allWalkersPositionsUponDeath.push(coordinates);
    }
    allWalkersPositionsUponDeath.forEach(walker => {
       walker.distance = evalDis(walker.x, walker.y, target.x, target.y);
    });
    let closestWalker = allWalkersPositionsUponDeath[0];
    allWalkersPositionsUponDeath.forEach(walker => {
        let distance = walker.distance;
        if(distance < closestWalker.distance){
            closestWalker = walker;
        }
    });
    console.log(closestWalker);
    let winnerNumber = closestWalker.id;
    let winnersMemory = arrOfWalkers[winnerNumber].decisions;
    console.log(winnersMemory);
}

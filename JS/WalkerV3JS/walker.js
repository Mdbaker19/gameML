let genCount = 0;

const starterSpots = 50;
let favorite;
let favoritesBest;
let children = [];

const target = new Goal(600, 550, 50);

init();
setInterval(recallSpawn, 3300);
setInterval(load, 22);



function load (){
    draw();
    for(let i = 0; i < children.length; i++){
        children[i].show("#d23838");
        children[i].move(50);
    }
    favorite.show("#15beda");
    favorite.move(50);
    target.show("#e1dada");

    favoritesBest = favorite.x.toFixed(1) + ", " + favorite.y.toFixed(1);
}

function recallSpawn(){
    evolvingSpawn(100);
    genCount++;
    document.getElementById("gen").innerText = genCount.toString();
    document.getElementById("best").innerText = favoritesBest;
}


function init(){
    theSpawning(100);
}

function theSpawning(x){
    children = [];
    favorite = new Walker(starterSpots, starterSpots, 10, 0, 0, 0, 0);
    for(let i = 0; i < x; i++){
        let copy = new Walker(starterSpots, starterSpots, 10, 0, 0, 0, 0);
        children.push(copy);
    }
}

function evolvingSpawn(x){
    let parent = getBestWalker(children);
    children = [];
    favorite = new Walker(starterSpots, starterSpots, 10, parent[0].value, parent[1].value, parent[2].value, parent[3].value);
    console.log("up " + favorite.upChance);
    console.log("right " + favorite.rightChance);
    console.log("down " + favorite.downChance);
    console.log("left " + favorite.leftChance);
    console.log("==========");
    for(let i = 0; i < x; i++){
        children.push(new Walker(starterSpots, starterSpots, 10, parent[0].value, parent[1].value, parent[2].value, parent[3].value));
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
    let tempClosestWalker = allWalkersPositionsUponDeath[0];
    allWalkersPositionsUponDeath.forEach(walker => {
        let distance = walker.distance;
        if(distance < tempClosestWalker.distance){
            tempClosestWalker = walker;
        }
    });
    let winnerNumber = tempClosestWalker.id;
    let winnersMemory = arrOfWalkers[winnerNumber].decisions;
    console.log(tempClosestWalker.distance);
    console.log(winnersMemory);
    let lowestValue = winnersMemory[0].value;
    winnersMemory.forEach(memory => {
        let value = memory.value;
        if(value < lowestValue){
            lowestValue = value;
        }
    });
    for(let i = 0; i < winnersMemory.length; i++){
        if(winnersMemory[i].value === lowestValue){
            winnersMemory[i].value = 5;
        }
    }
    return winnersMemory;
}

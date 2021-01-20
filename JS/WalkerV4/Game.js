// 800 W x 900 H
const genSpot = document.getElementById("gen");

let winnerID;
const size = 10;
const goalX = 600;
const goalY = 700;
let all = [];
let genCount = 0;
setInterval(load, 25);
spawn(5);

function load(){
    draw();
    create();
    showGoal();
}
const recall = () => {
    let winnerValues = getBestWalker(all);
    console.log(winnerValues);
    for(let i = 0; i < all.length; i++){
        if(all[i].id === winnerValues[0]){
            winnerID = all[i].id;
        }
    }
    console.log("next gen");
    genCount++;
    genSpot.innerText = genCount.toString();
    spawn(5);
}
setInterval(recall, 4500);


function spawn(count){
    all = [];
    for(let i = 0; i < count; i++){
        let ranX = random(100, 200);
        let ranY = random(100, 50);
        let color = randomColor();
        all.push(new Walker(ranX, ranY, size, color, i));
    }
    // create a walker with the best position the next time around with that same id but now what
    all.push(new Walker(50, 50, size, "#ffffff", winnerID ?? 10));
}

function create(){
    for(let i = 0; i < all.length; i++){
        all[i].move();
        all[i].show();
    }
}

function getBestWalker(array){
    console.log(array);
    let allDistances = [];
    for(let i = 0; i < array.length; i++){
        let walkersDist = evalDis(array[i].x, array[i].y, goalX, goalY);
        allDistances.push([array[i].id , walkersDist])
    }
    let bestDist = allDistances[0][1];
    let bestWalkerId = allDistances[0][0];

    for(let i = 0; i < allDistances.length; i++){
        let currD = allDistances[i][1];
        let currId = allDistances[i][0];
        if(currD < bestDist) {
            bestDist = currD;
            bestWalkerId = currId;
        }
    }
    return [bestWalkerId, bestDist];
}

const showGoal = () => fill(goalX, goalY, 100, 50, "#16c1b9");
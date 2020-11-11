(function (){
    const cvs = document.getElementById("walker");
    const ctx = cvs.getContext("2d");
    const flipGoal = document.getElementById("flipGoal");
    let goalFlipped = false;
    let flipCounter = 0;
    const spawnRight = document.getElementById("spawnRight");
    let rightPreference = false;
    const spawnLeft = document.getElementById("spawnLeft");
    let leftPreference = false;
    const randomizeSpawn = document.getElementById("randomSpawn");
    let randomSpawn = true;
    randomizeSpawn.style.backgroundColor = "black";
    randomizeSpawn.disabled = true;
    let range1 = 100;
    let range2 = 100;
    let range3 = 100;
    let range4 = 100;
    let lifeCycleNum = 0;
    const walker = {
        x: 100,
        y: Math.floor(cvs.height/1.5),
        size: 20,
        moveX: 5,
        moveY: 5,
        color: "#ffffff",
        walk: function (){
            let randomNum = Math.floor(Math.random() * 600) + 1;
            if(randomNum < range1){
                if(this.x + this.size < cvs.width) {
                    this.x += this.moveX;
                }
            }
            if(randomNum < range2){
                if(this.x > 0) {
                    this.x -= this.moveX;
                }
            }

            if(randomNum < range3){
                if(this.y > 0) {
                    this.y -= this.moveY;
                }
            }
            if(randomNum < range4){
                if(this.y + this.size < cvs.height) {
                    this.y += this.moveY;
                }
            }
        }
    }
    let goal = {
        x: cvs.width/2 - 25,
        y: 0,
        w: 50,
        h: 25
    }
    flipGoal.addEventListener("click", function (){
        flipCounter++;
        if(flipCounter % 2 !== 0) {
            goal.y = 775;
            goalFlipped = true;
        } else {
            goal.y = 0;
            goalFlipped = false;
        }
    });
    setInterval(load, 150);
    function load(){
        draw();
        walker.walk();
        startNextCycle();
    }
    function inGoal(walkerX, walkerY, walkerSize, goalX, goalY, goalWidth, goalHeight, flipStatus){
        if(walkerX + walkerSize > goalX && walkerX < goalX + goalWidth){
            if((walkerY + walkerSize > goalY && flipStatus) || (walkerY < goalY + goalHeight && !flipStatus)){
                return true;
            }
        }
    }
    let chance1 = range1/600;
    let chance2 = range2/600;
    let chance3 = range3/600;
    let chance4 = range4/600;
    function updateChances(){
        chance1 = range1/600;
        chance2 = range2/600;
        chance3 = range3/600;
        chance4 = range4/600;
    }
    setInterval(updateChances, 50);
    function draw(){
        fill(0, 0, cvs.width, cvs.height, "#0e0b0b");//canvas
        fill(walker.x, walker.y, walker.size, walker.size, walker.color);//walker
        fill(goal.x, goal.y, goal.w, goal.h, "#e1d3d3");//goal
        if(!goalFlipped) {
            ctx.fillText("goal", cvs.width/2 - 12.5, 40, 50);//text
        } else {
            ctx.fillText("goal", cvs.width/2 - 12.5, 760, 50)
        }
        ctx.fillText("Life Cycle Number: " + lifeCycleNum, 50, 100, 100);//life counter
        ctx.fillText(`current coordinates: [${walker.x}, ${walker.y}]`, 50, 200, 200);
        ctx.fillText(`chance to go right is: ${chance1.toFixed(2)}%`, 50, 250, 200);
        ctx.fillText(`chance to go left is: ${chance2.toFixed(2)}%`, 50, 275, 200);
        ctx.fillText(`chance to go up is: ${chance3.toFixed(2)}%`, 50, 300, 200);
        ctx.fillText(`chance to go down is: ${chance4.toFixed(2)}%`, 50, 325, 200);
    }
    function fill(lx, ty, w, h, c){
        ctx.fillStyle = c;
        ctx.fillRect(lx, ty, w, h);
    }

    setInterval(evolve, 300);
    function evolve(){
        learn();
        walker.color = ranColor();
    }
    randomizeSpawn.addEventListener("click", function(){
        randomSpawn = true;
        if(randomSpawn){
            randomizeSpawn.style.backgroundColor = "black";
            randomizeSpawn.disabled = true;
        }
    });
    spawnLeft.addEventListener("click", function(){
        randomizeSpawn.disabled = false;
        randomizeSpawn.style.backgroundColor = "#333232";
        leftPreference = true;
        rightPreference = false;
    });
    spawnRight.addEventListener("click", function (){
        randomizeSpawn.disabled = false;
        randomizeSpawn.style.backgroundColor = "#333232";
        rightPreference = true;
        leftPreference = false;
    });
    function startNextCycle(){
        let ranXSpawn;
        if(randomSpawn){
            ranXSpawn = Math.floor(Math.random() * 600) + 150;
        }
        if(rightPreference) {
            ranXSpawn = Math.floor(Math.random() * 150) + 600;
        } else if(leftPreference){
            ranXSpawn = Math.floor(Math.random() * 50) + 50;
        }
        let ranYSpawn = Math.floor(Math.random() * 150) + 600;
        if(goalFlipped){
            ranYSpawn = Math.floor(Math.random() * 50) + 500;
        }
        if(inGoal(walker.x, walker.y, walker.size, goal.x, goal.y, goal.w, goal.h, goalFlipped)){
                walker.y = ranYSpawn;
                walker.x = ranXSpawn;
                lifeCycleNum++;
        }
    }

    function learn() {
        if (walker.x < goal.x) {
            if (range1 < 595) {
                range1 += 5;
            }
            if(range2 > 5){
                range2 -= 3;
            }
        } else if (walker.x > goal.x) {
            if (range2 < 595) {
                range2 += 5;
            }
            if(range1 > 5){
                range1 -= 3;
            }
        }
        if (walker.y < goal.y) {
            if (range4 < 595) {
                range4 += 5;
            }
            if(range3 > 5){
                range3 -= 3;
            }
        } else if (walker.y > goal.y) {
            if (range3 < 595) {
                range3 += 5;
            }
            if(range4 > 5){
                range4 -= 3;
            }
        }
    }
    function ranColor(){
        let output = "#";
        const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "a", "b", "c", "d", "e", "f"];
        for(let i = 0; i < 6; i++){
            let ran = Math.floor(Math.random() * options.length-1) + 1;
            output+=options[ran];
        }
        return output;
    }
})();
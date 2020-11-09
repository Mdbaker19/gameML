(function (){
    const cvs = document.getElementById("walker");
    const ctx = cvs.getContext("2d");
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
            let randomNum = Math.floor(Math.random() * 400) + 1;
            if(randomNum < range1){
                if(this.x + this.size < cvs.width) {
                    this.x += this.moveX;
                }
            } else if(randomNum < range2){
                if(this.x > 0) {
                    this.x -= this.moveX;
                }
            }

            if(randomNum < range3){
                if(this.y > 0) {
                    this.y -= this.moveY;
                }
            } else if(randomNum < range4){
                if(this.y + this.size < cvs.height) {
                    this.y += this.moveY;
                }
            }
        }
    }
    const goal = {
        x: cvs.width/2 - 25,
        y: 0
    }
    let reassigned = true;
    setInterval(load, 50);
    function load(){
        draw();
        walker.walk();
        startNextCycle();
        if(walker.x >= 400 && walker.x <= 350){
            walker.moveX = 0;
        }
    if(reassigned) {
        if (walker.x > cvs.width / 2) {
            reassigned = false;
            range1 = 100;
            range2 = 100;
        }
    }
    }
    function draw(){
        fill(0, 0, cvs.width, cvs.height, "#0e0b0b");//canvas
        fill(walker.x, walker.y, walker.size, walker.size, walker.color);//walker
        fill(goal.x, goal.y, 50, 25, "#e1d3d3");//goal
        ctx.fillText("Life Cycle Number: " + lifeCycleNum, 100, 100, 100);//life counter
        ctx.fillText("goal", cvs.width/2 - 12.5, 40, 25);//text
        ctx.fillText(`current coordintates: [${walker.x}, ${walker.y}]`, 200, 200, 200);
    }
    function fill(lx, ty, w, h, c){
        ctx.fillStyle = c;
        ctx.fillRect(lx, ty, w, h);
    }

    let startingXDistance;
    let startingYDistance;
    function checkDistance(){
        startingXDistance = walker.x - goal.x;
        startingYDistance = walker.y - goal.y;
        if(walker.y > 0) {
            console.log("current x dis: " + startingXDistance);
            console.log("current y dis: " + startingYDistance);
        }
    }
    setInterval(checkDistance, 1000);
    setInterval(evolve, 2000);
    function evolve(){
        learn();
        walker.color = ranColor();
    }
    function startNextCycle(){
        let ranXSpawn = Math.floor(Math.random() * 600) + 150;
        let ranYSpawn = Math.floor(Math.random() * 150) + 600;
        if(walker.y < 10){
            walker.y = ranYSpawn;
            walker.x = ranXSpawn;
            lifeCycleNum++;
            walker.moveX = 5;
        }
    }
    function learn(){
        if(walker.x - goal.x < startingXDistance){
            if(range2 < 400) {
                range1 += 5;
            }
        } else{
            if(range1 < 400) {
                range2 += 5;
            }
        }
        if(walker.y - goal.y < startingYDistance){
            if(range4 < 400) {
                range4 += 5;
            }
        } else {
            if(range3 < 400) {
                range3 += 5;
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
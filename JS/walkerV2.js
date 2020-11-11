(function (){
    "use strict";
    //800x800;
    const cvs = document.getElementById("walkV2C");
    const context = cvs.getContext("2d");
    let placeHolder = 0;
    const goal = {
        x: 375,
        y: 770,
        w: 50,
        h: 30
    }
    const finder = {
        x: 50,
        y: 50,
        s: 20,
        decisions: [0, 0, 0, 0],//up, right, down, left;
        initialMove: function (){
            let randomNum = Math.floor(Math.random() * 4);
            let distanceBeforeMove = evalDistance(this.x, this.y, goal.x, goal.y);
            let distanceAfterMove;
            if(randomNum === 0){
                this.y -= 5;
                distanceAfterMove = evalDistance(this.x, this.y, goal.x, goal.y);
                if(distanceAfterMove < distanceBeforeMove){
                    this.decisions[0]++;
                }
            } else if(randomNum === 1){
                this.x += 5;
                distanceAfterMove = evalDistance(this.x, this.y, goal.x, goal.y);
                if(distanceAfterMove < distanceBeforeMove){
                    this.decisions[1]++;
                }
            } else if(randomNum === 2){
                this.y += 5;
                distanceAfterMove = evalDistance(this.x, this.y, goal.x, goal.y);
                if(distanceAfterMove < distanceBeforeMove){
                    this.decisions[2]++;
                }
            } else if(randomNum === 3){
                this.x -= 5;
                distanceAfterMove = evalDistance(this.x, this.y, goal.x, goal.y);
                if(distanceAfterMove < distanceBeforeMove){
                    this.decisions[3]++;
                }
            }
        }
    }

    function logDecisions(){
        console.log(finder.decisions);
    }
    function startMovements(){
        finder.initialMove();
    }
    function beginFind(){
        logDecisions();
        startMovements();
    }
    setInterval(beginFind, 500);

    function moveBest(arr){
        let highest = 0;
        arr.forEach((num) => {
           if(num > highest){
               highest = num;
           }
        });
        return highest;
    }

    //=====================//
    setInterval(load, 50);
    function load(){
        draw();
    }
    function draw(){
        fill(0, 0, cvs.width, cvs.height, "#000000");
        fill(finder.x, finder.y, finder.s, finder.s, "#095ed0");
        fill(goal.x, goal.y, goal.w, goal.h, "#ffffff");
        context.fillText("GOAL", goal.x + goal.w/5, goal.y - goal.h/3, goal.w);
        context.fillText(`LIFE CYCLE : ${placeHolder}`, 100, 100, 75);
        context.fillText(`UP % => ${placeHolder}`, 100, 125, 75);
        context.fillText(`RIGHT % => ${placeHolder}`, 100, 150, 75);
        context.fillText(`DOWN % => ${placeHolder}`, 100, 175, 75);
        context.fillText(`LEFT % => ${placeHolder}`, 100, 200, 75);
    }
    function fill(lx, ty, w, h, c){
        context.fillStyle = c;
        context.fillRect(lx, ty, w, h);
    }
    //=====================//


    function evalDistance(fx, fy, gx, gy){
        let a = Math.abs(fx - gx);
        let b = Math.abs(gy - fy);
        return (a ** 2) + (b ** 2);
    }


})();
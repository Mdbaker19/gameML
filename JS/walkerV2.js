(function (){
    "use strict";
    //800x800;
    const cvs = document.getElementById("walkV2C");
    const context = cvs.getContext("2d");
    let lifeCycle = 0;
    let distanceBeforeMove;
    let distanceAfterMove;
    const goal = {
        x: 375,
        y: 700,
        w: 50,
        h: 30
    }
    const finder = {
        x: 50,
        y: 50,
        s: 20,
        memory: [],
        decisions: [{
            choice: "Up",
            choiceNum: 0
        }, {
            choice: "Right",
            choiceNum: 0
        }, {
            choice: "Down",
            choiceNum: 0
        }, {
            choice: "Left",
            choiceNum: 0
        }],
        initialMove: function (){
            let randomNum = Math.floor(Math.random() * 4);
            distanceBeforeMove = evalDistance(this.x, this.y, goal.x, goal.y);
            if(randomNum === 0){
                this.y -= 5;
                distanceAfterMove = evalDistance(this.x, this.y, goal.x, goal.y);
                if(distanceAfterMove < distanceBeforeMove){
                    this.decisions[0].choiceNum++;
                }
            } else if(randomNum === 1){
                this.x += 5;
                distanceAfterMove = evalDistance(this.x, this.y, goal.x, goal.y);
                if(distanceAfterMove < distanceBeforeMove){
                    this.decisions[1].choiceNum++;
                }
            } else if(randomNum === 2){
                this.y += 5;
                distanceAfterMove = evalDistance(this.x, this.y, goal.x, goal.y);
                if(distanceAfterMove < distanceBeforeMove){
                    this.decisions[2].choiceNum++;
                }
            } else if(randomNum === 3){
                this.x -= 5;
                distanceAfterMove = evalDistance(this.x, this.y, goal.x, goal.y);
                if(distanceAfterMove < distanceBeforeMove){
                    this.decisions[3].choiceNum++;
                }
            }
        }
    }

    //=========================//
    function logDecisions(){
        // console.log(moveBest(finder.decisions));
        console.log(toFindInitialBestMove(finder.decisions));
    }
    function startMovements(){
        finder.initialMove();
    }
    function beginFind(){
        startMovements();
        // logDecisions();
    }
    let startSearch = setInterval(beginFind, 500);

    // WHERE TO USE THIS?? FORGOT HONESTLY
    function moveBest(arr){
        let preferredChoices = {};
        let highest = 0;
        let choice = null;
        arr.forEach((item) => {
           if(item.choiceNum > highest){
               highest = item.choiceNum;
               choice = item.choice;
           }
        });
        preferredChoices.best = choice;
        preferredChoices.timesCorrect = highest;
        // i want to remove this best and most helpful decision from the array to then have
        // a second best option be in the preferred choices as well
        return preferredChoices;
    }
    //=========================//





    //=============//
    // THIS IS AFTER THE INITIAL BEST MOVE IS FOUND
    // WILL HAVE TO MAKE MOVES THERE AFTER AND CONTINUE TO EVAL DISTANCE EVERY TIME
    // PROBABLY HAVE TO KEEP INCREMENTING THE DECISIONS ARRAY AS MOVEMENTS HELP
    function findGoal(){
        if(toFindInitialBestMove(finder.decisions) === "UP"){
            console.log("Start going Up");
            // finder.y -= 5;
        }else if(toFindInitialBestMove(finder.decisions) === "Right"){
            console.log("Start going Right");
            // finder.x += 5;
        }else if(toFindInitialBestMove(finder.decisions) === "Down"){
            console.log("Start going Down");
            // finder.y += 5;
        }else if(toFindInitialBestMove(finder.decisions) === "Left"){
            console.log("Start going Left");
            // finder.x -= 5;
        }
    }
    //==============//
    let forInitial = setInterval(runInitial, 50);
    function runInitial(){
        if ((toFindInitialBestMove(finder.decisions)) !== "notFound") {
            clearInterval(forInitial);
            clearInterval(startSearch);
            console.log(`Initial Search Stopped, best move is currently: ${toFindInitialBestMove(finder.decisions)}`);
            setInterval(findGoal, 500);
        }
    }


    function toFindInitialBestMove(arr){
        let highest = 0;
        let choice = "notFound";
        arr.forEach((item) => {
            if(item.choiceNum > highest){
                highest = item.choiceNum;
                choice = item.choice;
            }
        });
        // console.log(choice);
        return choice;
    }
    //===============//


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
        context.fillText(`LIFE CYCLE : ${lifeCycle}`, 100, 100, 75);
        context.fillText(`UP => ${finder.decisions[0].choiceNum}`, 100, 125, 75);
        context.fillText(`RIGHT => ${finder.decisions[1].choiceNum}`, 100, 150, 75);
        context.fillText(`DOWN => ${finder.decisions[2].choiceNum}`, 100, 175, 75);
        context.fillText(`LEFT => ${finder.decisions[3].choiceNum}`, 100, 200, 75);
    }
    function fill(lx, ty, w, h, c){
        context.fillStyle = c;
        context.fillRect(lx, ty, w, h);
    }
    //=====================//


    function evalDistance(fx, fy, gx, gy){
        let a = Math.abs(fx - gx);
        let b = Math.abs(gy - fy);
        return Math.sqrt((a ** 2) + (b ** 2));
    }


    //=================//
    //===========================LOGIC NOTES AREA========================//
    //
    // BEST MOVE IS FOUND INITIALLY

    // CONTINUE GOING THAT WAY WHILE CHECKING OTHER MOVES PERIODICALLY

    // IF ANOTHER MOVE IS FOUND TO BE HELPFUL =>............ DO SOMETHING
    // MAYBE START GOING THAT WAY HALF THE TIME OR SOMETHING

    // BEGIN MAKING THE MOVES THAT HAVE THE MOST "HELPFULNESS" UNTIL
    // THAT MOVE IS FOUND TO BE "UN-HELPFUL" (INCREASE DISTANCE)
    // REMOVE THAT MOVE FROM THE DECISIONS ARRAY AS A POSSIBILITY INTO A "MEMORY" ARRAY
    // IF THIS HAPPENS TO THE POINT WHERE ALL MOVES ARE NO LONGER HELPFUL, REFERENCE THE MEMORY ARRAY AND MAKE
    // DECISIONS AGAIN BASED ON WHAT HAS THE HIGHEST "HELPFULNESS" COUNTER

    // IF AT ANY TIME A PRIOR GOOD MOVE IS NOW FOUND TO BE A BAD MOVE,
    // BEGIN SEARCHING ALL POSSIBLE MOVES AGAIN FOR THE NEW SET OF "HELPFUL" MOVES

    // CONTINUE THIS UNTIL AT GOAL


    //=====================================================//

})();
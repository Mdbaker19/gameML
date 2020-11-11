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
        y: 770,
        w: 50,
        h: 30
    }
    const finder = {
        x: 50,
        y: 50,
        s: 20,
        decisions: [{
            choiceNum: 0,
            choice: "Up"
        }, {
            choiceNum: 0,
            choice: "Right"
        }, {
            choiceNum: 0,
            choice: "Down"
        }, {
            choiceNum: 0,
            choice: "Left"
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
        console.log(moveBest(finder.decisions));
    }
    // setInterval(logDecisions, 300);
    function startMovements(){
        finder.initialMove();
    }
    function beginFind(){
        startMovements();
        logDecisions();
    }
    let startSearch = setInterval(beginFind, 500);

    function moveBest(arr){
        let preferredChoices = {};
        let highest = 0;
        let choice = null;
        arr.forEach((num) => {
           if(num.choiceNum > highest){
               highest = num.choiceNum;
               choice = num.choice;
           }
        });
        preferredChoices.best = choice;
        preferredChoices.helpfullness = highest;
        // i want to remove this best and most helpful decision from the array to then have
        // a second best option be in the preferred choices as well
        return preferredChoices;
    }
    //=========================//

    //FOR LATER AFTER OTHER LOGIC IS FIGURED OUT. THIS WILL STOP THE INITIAL MOVEMENTS
    // AND TELL WHICH MOVE SHOULD BE MADE AFTER IN THE CONSOLE;
    //=============//
    // function findGoal(){
    //     if(toFindInitialBestMove(finder.decisions) === "UP"){
    //         console.log("Start going Up");
    //     }else if(toFindInitialBestMove(finder.decisions) === "Right"){
    //         console.log("Start going Right");
    //     }else if(toFindInitialBestMove(finder.decisions) === "Down"){
    //         console.log("Start going Down");
    //     }else if(toFindInitialBestMove(finder.decisions) === "Left"){
    //         console.log("Start going Left");
    //     }
    // }
    //
    // if(toFindInitialBestMove(finder.decisions) !== "null"){
    //     setTimeout(function (){clearInterval(startSearch)}, 500);
    //     console.log("Search Stopped");
    //     console.log(toFindInitialBestMove(finder.decisions));
    //     setInterval(findGoal, 250);
    // }
    //
    //
    // function toFindInitialBestMove(arr){
    //     let highest = 0;
    //     let choice = null;
    //     arr.forEach((num) => {
    //         if(num.choiceNum > highest){
    //             highest = num.choiceNum;
    //             choice = num.choice;
    //         }
    //     });
    //     // console.log(choice);
    //     return choice;
    // }
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
        context.fillText(`UP % => ${finder.decisions[0].choiceNum}`, 100, 125, 75);
        context.fillText(`RIGHT % => ${finder.decisions[1].choiceNum}`, 100, 150, 75);
        context.fillText(`DOWN % => ${finder.decisions[2].choiceNum}`, 100, 175, 75);
        context.fillText(`LEFT % => ${finder.decisions[3].choiceNum}`, 100, 200, 75);
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
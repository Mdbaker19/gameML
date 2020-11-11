(function (){
    "use strict";
    //800x800;
    const cvs = document.getElementById("walkV2C");
    const context = cvs.getContext("2d");
    const finder = {
        x: 50,
        y: 50,
        s: 20
    }
    const goal = {
        x: 375,
        y: 770,
        w: 50,
        h: 30
    }
    setInterval(load, 50);
    function load(){
        draw();
    }
    function draw(){
        fill(0, 0, cvs.width, cvs.height, "#000000");
        fill(finder.x, finder.y, finder.s, finder.s, "#da6464");
        fill(goal.x, goal.y, goal.w, goal.h, "#ffffff");
        context.fillText("GOAL", goal.x + goal.w/5, goal.y - goal.h/3, goal.w);
    }
    function fill(lx, ty, w, h, c){
        context.fillStyle = c;
        context.fillRect(lx, ty, w, h);
    }


})();
(function () {
    "use strict";

    const cvs = document.getElementById("gridArea");
    const ctx = cvs.getContext("2d");

    let cols = 5;
    let rows = 5;
    let grid = new Array();

    let w = cvs.width/cols;
    let h = cvs.height/rows;


    let openSet = [];
    let closedSet = [];
    let start;
    let end;


    function Spot(i, j){
        this.x = i;
        this.y = j;
        this.f = 0;
        this.g = 0;
        this.h = 0;

        this.show = function (color){
            ctx.fillStyle = color;
            ctx.fillRect(this.x * w, this.y * h, w, h);
        };

    }





    window.onload = function (){
        // fill(0, 0, cvs.width, cvs.height, "#000000");
        load();
        draw();
    }

    function load(){

        for(let i = 0; i < cols; i++){
            grid[i] = new Array(rows);
        }

        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                grid[i][j] = new Spot(i, j);
            }
        }
        start = grid[0][0];
        end = grid[cols-1][rows-1];

        openSet.push(start);






        console.log(grid);
    }

    function draw(){

        if(openSet.length > 0){
            //keep going
        } else {
            //no solution
        }


        for(let i = 0; i < cols; i++){
            for(let j = 0; j < rows; j++){
                grid[i][j].show("#ffffff");
            }
        }

        for(let i = 0; i < closedSet.length; i++){
            closedSet[i].show("red");
        }

        for(let i = 0; i < openSet.length; i++){
            openSet[i].show("green");
        }


    }
    function fill(lx, ty, w, h, c){
        ctx.fillStyle = c;
        ctx.fillRect(lx, ty, w, h);
    }

    function rect(lx, ly, w, h){
        ctx.lineWidth = 2;
        ctx.strokeRect(lx, ly, w, h);

    }






})();
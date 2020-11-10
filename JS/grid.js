
    "use strict";
    const cvs = document.getElementById("gridArea");
    const context = cvs.getContext("2d");
    const size = 80;
    let s = 0;
    const rows = Math.floor(cvs.width/size);
    const cols = Math.floor(cvs.height/size);

    window.onload = function(){
        load();
    }

    function load(){
        draw();
    }

    function draw(){
        for(let i = 0; i < rows; i++){
            fill(0, s, size, size, "#000000");
            let y = 0;
            for(let j = 0; j < cols; j++){
                fill(s, y, size, size, "#000000");
                y+=size;
            }
            s+=size;
        }
    }
    function fill(lx, ty, w, h, c){
        context.fillStyle = c;
        context.strokeRect(lx, ty, w, h);
    }



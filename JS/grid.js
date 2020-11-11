(function () {
    "use strict";
    const cvs = document.getElementById("gridArea");
    const context = cvs.getContext("2d");
    const size = 80;
    let s = 0;
    const rows = Math.floor(cvs.width / size);
    const cols = Math.floor(cvs.height / size);

    const searcher = {
        x: 0,
        y: 0,
        moveSpeed: 80,
        search: function (){
            if(this.x < cvs.width-size){
                this.x += this.moveSpeed;
            }
            if(this.y < cvs.height - size){
                this.y += this.moveSpeed;
            }
        }
    }
    setInterval(load, 1000);


    function load() {
        draw();
        fill(720, 720, size, size, "#b01818");
        fill(searcher.x, searcher.y, size, size, "#3e8fa7");
        searcher.search();
    }

    function draw() {
        for (let i = 0; i < rows; i++) {
            clearFill(0, s, size, size, "#000000");
            let y = 0;
            for (let j = 0; j < cols; j++) {
                clearFill(s, y, size, size, "#000000");
                y += size;
            }
            s += size;
        }
    }

    function clearFill(lx, ty, w, h, c) {
        context.fillStyle = c;
        context.strokeRect(lx, ty, w, h);
    }

    function fill(lx, ty, w, h, c) {
        context.fillStyle = c;
        context.fillRect(lx, ty, w, h);
    }
})();
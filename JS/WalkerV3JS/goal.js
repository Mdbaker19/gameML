function Goal(x, y, s){
    this.x = x;
    this.y = y;
    this.s = s;

    this.show = function (c){
        cc.fillStyle = c;
        cc.fillRect(this.x, this.y, this.s, this.s);
    }

    this.goal = function (objX, objY){
        if(objX > this.x) {//WILL COME BACK TO THIS HIT DETECTION LATER WHEN THEY ACTUALLY MAKE IT
            return true;
        }
    }
}
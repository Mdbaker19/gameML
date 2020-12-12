function Walker(x, y, size){
    this.x = x;
    this.y = y;
    this.s = size;

    this.show = function (color){
        cc.fillStyle = color;
        cc.fillRect(this.x, this.y, this.s, this.s);
    }


    this.decisions = [{
        decision: "up",
        value: 0
    }, {
        decision: "right",
        value: 0
    }, {
        decision: "down",
        value: 0
    },{
        decision: "left",
        value: 0
    }];

    this.upChance = 20;
    this.rightChance = 40;
    this.downChance = 60;
    this.leftChance = 80;

    this.move = function (rate){
        let ran = (~~(Math.random() * rate)) / 10;
        let ranChoice = ~~(Math.random() * 101);
        if(ranChoice < this.upChance){
            this.y -= ran;
            this.decisions[0].value++;
        } else if(ranChoice < this.rightChance){
            this.x += ran;
            this.decisions[1].value++;
        } else if(ranChoice < this.downChance){
            this.y += ran;
            this.decisions[2].value++;
        } else if(ranChoice < this.leftChance){
            this.x -= ran;
            this.decisions[3].value++;
        }
    }


}

/* SO WITH EVERY MOVE THE DECISION IS INCREMENTED
    AFTER THE TIME OUT
        EVERY WALKER WOULD THEN BE RESPAWN WITH THAT DECISION AS MEMORY
    THE DECISION VALUES GET ADJUSTED IN THE "RATE" OPTIONS TO INFLUENCE THE CHANCES TO MAKE THOSE SAME MOVES AGAIN
 */

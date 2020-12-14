function Walker(x, y, size, up, right, down, left){
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

    // this.upChance = up || 25;//parseFloat((up / 2).toFixed(1));
    // this.rightChance = right || 50;//parseFloat((right / 2).toFixed(1));
    // this.downChance = down || 75;//parseFloat((down / 2).toFixed(1));
    // this.leftChance = left || 100;//parseFloat((left / 2).toFixed(1));

    this.upChance = 100 + up;
    this.rightChance = 100 + right;
    this.downChance = 100 + down;
    this.leftChance = 100 + left;


    this.move = function (rate){
        let ran = (~~(Math.random() * rate)) / 10;
        let ranUp = ~~(Math.random() * 275);
        let ranRight = ~~(Math.random() * 275);
        let ranDown = ~~(Math.random() * 275);
        let ranLeft = ~~(Math.random() * 275);
        if(ranUp < this.upChance){
            this.y -= ran;
            this.decisions[0].value++;
        }
        if(ranDown < this.downChance){
            this.y += ran;
            this.decisions[2].value++;
        }
        if(ranRight < this.rightChance){
            this.x += ran;
            this.decisions[1].value++;
        }
        if(ranLeft < this.leftChance){
            this.x -= ran;
            this.decisions[3].value++;
        }
    }


}

/* THE DECISIONS ARRAY FROM MEMORY NEEDS TO TAKE OUT THE BEST 2 CHOICES TO THEN ADD THE THE BASE VALUE TO PREVENT THIS FULL UP MOVEMENT
 */

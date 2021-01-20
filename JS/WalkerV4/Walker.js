function Walker (x, y, s, c, id){
    this.x = x;
    this.y = y;
    this.s = s;
    this.c = c;
    this.id = id;

    this.show = () => {
        fill(this.x, this.y, this.s, this.s, this.c);
    }

    this.brain = {};
    this.fitness = 0;

    this.update = () => {
        // console.log(this); // the parent walker

    }

    this.move = () => {

        let ranX = random(1, 5);
        let ranY = random(1, 5);

        let ranChoice = random(1, 5); // 1, 2, 3, 4


        if(ranChoice === 1){
            this.y+=ranY;
            this.x+=ranX;
        } else if(ranChoice === 2){
            this.y-=ranY;
            this.x+=ranX;
        } else if(ranChoice === 3){
            this.y+=ranY;
            this.x-=ranX;
        } else if(ranChoice === 4){
            this.y-=ranY;
            this.x-=ranX;
        }


    }

}
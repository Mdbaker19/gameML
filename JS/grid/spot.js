function Spot(i, j){
    this.x = i;
    this.y = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;

    this.show = function (color){
        ctx.strokeStyle = color;
        ctx.lineWidth = 5;
        ctx.strokeRect(this.x * w, this.y * h, w, h);
    };

}
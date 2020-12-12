let passingTime = 0;
let time = document.getElementById("timer");
setInterval(load, 1000);

function load(){
    passingTime++;
    time.innerText = passingTime;
    if(passingTime > 9){
        passingTime = 0;
    }
}
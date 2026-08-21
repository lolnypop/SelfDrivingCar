const canvas = document.getElementById("mainCanvas");

const minimumCanvasHeight = 400;

canvas.width = 400;
canvas.height = Math.max(window.innerHeight, minimumCanvasHeight);

// automatically updating canvas size on window resize event 
window.addEventListener('resize', () => {
    canvas.width = 400;
    canvas.height = Math.max(window.innerHeight, minimumCanvasHeight);
})

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width/2, canvas.width*0.9, 5); // pass through middle x axis value, width of the road, lane count
const car = new Car(road.getLaneCenter(3), 200, 50, 80, "images/player-car.png");

let lastTime = 0;
animate();

function animate(timestamp) {

    // using a technique called delta time in order to avoid game breaking for people with higher FPS
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    if (isNaN(deltaTime)) {
        deltaTime = 0;
    }

    if (deltaTime > 100) {
        deltaTime = 16.66;
    }

    const dt = deltaTime / 16.66 // 60 FPS for game logic
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    car.update(dt);
    road.draw(ctx);
    car.draw(ctx);
    requestAnimationFrame(animate);
}
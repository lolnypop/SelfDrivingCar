class Car {
    
    constructor(x, y, width, height, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.controls = new Controls();

        this.speed = 0;
        this.acceleration = 0.4;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;

        this.img = new Image();
        this.img.src = imageSrc;

    }

    update(deltaTime) {
        this.#move(deltaTime);
    }

    #move(deltaTime) {
        
        // the movement values with delaTime accounted for
        const acceleration = this.acceleration * deltaTime;
        const friction = this.friction * deltaTime;
        const steerAngle = 2.5 * deltaTime; 

        // pressing forward key increases speed by the constant acceleration
        if (this.controls.forward) {
            this.speed += acceleration;
        }

        // pressing backward key decreases speed by the constant acceleration 
        if (this.controls.backward) {
            this.speed -= acceleration;
        }

        // if speed becomes greater than maxSpeed, set the speed exactly to the maxSpeed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        // if speed is less than half of maxSpeed going BACKWARDS (negative), set the speed to half of maxSpeed but negative (so it keeps going backwards. negative refers backwards)
        if (this.speed < (-this.maxSpeed/2)) {
            this.speed = (-this.maxSpeed/2);
        }

        // when speed is more than 0, keep applying friction AKA keep decreasing speed by constant friction
        if (this.speed > 0) {
            this.speed -= friction;
        }

        // when speed is less than 0, keep increasing speed by constant friction. GOAL is to reach stoppage or 0 speed
        if (this.speed < 0) {
            this.speed += friction;
        }

        // when absolute value of speed is less than the constant friction. set speed to 0
        if (Math.abs(this.speed) < friction) {
            this.speed = 0;
        }

        // pressing left key decreases angle (in degrees). Negative value means it will turn left
        if (this.controls.left) {
            this.angle -= steerAngle;
        }

        // pressing right key increases angle (in degrees). Positive value means it will turn left
        if (this.controls.right) {
            this.angle += steerAngle;
        }

        const speed = this.speed * deltaTime; // speed accounted for deltaTime
        // after the speed value has been crafted. set the axis y = speed
        this.x += Math.sin(toRadian(this.angle)) * speed; // positive values go right, negative values go left 
        this.y -= Math.cos(toRadian(this.angle)) * speed; // decrease y because negative y is up in a computer screen
    }

    draw(ctx){
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(toRadian(this.angle));

        ctx.drawImage(
            this.img,
            (-this.width)/2,
            (-this.height)/2,
            this.width,
            this.height
        )

        ctx.restore();
    }
}
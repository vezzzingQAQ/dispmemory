class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    copy() {
        return new Vector(this.x, this.y);
    }
    add(vec) {
        this.x += vec.x;
        this.y += vec.y;
        return this;
    }
    sub(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
        return this;
    }
    div(num) {
        this.x /= num;
        this.y /= num;
        return this;
    }
    mult(num) {
        this.x *= num;
        this.y *= num;
        return this;
    }
    limit(num) {
        let cnum = this.mag();
        if (cnum > num) {
            this.x = this.x * num / cnum;
            this.y = this.y * num / cnum;
        }
        return this;
    }
    normalize() {
        let cnum = this.mag();
        this.x = this.x * 1 / cnum;
        this.y = this.y * 1 / cnum;
        return this;
    }
    mag() {
        return sqrt(this.x ** 2 + this.y ** 2);
    }
}

function vector_sub(vec1, vec2) {
    let newVec = vec1.copy();
    return newVec.sub(vec2);
}
function vector_add(vec1, vec2) {
    let newVec = vec1.copy();
    return newVec.add(vec2);
}

class BasicMover {
    constructor(mass = 1, position = new Vector(width / 2, height / 2), velocity = new Vector(0.1, 0)) {
        this.position = position;
        this.pposition = position.copy();
        this.velocity = velocity;
        this.acceleration = new Vector(0, 0);
        this.mass = mass;
    }
    applyForce = function (force, showForce = false, len = 10) {//apply force
        var f = force.copy();
        this.acceleration.add(f.div(this.mass));
        if (showForce) {
            stroke(rgba(255, 255, 255, 0.3));
            let k = len * 10000;
            line(this.position.x, this.position.y, this.position.x + f.x * k, this.position.y + f.y * k);
            pushMatrix();
            translate(this.position.x + f.x * k, this.position.y + f.y * k);
            let angle = atan2(f.y, f.x);
            let size = 5;
            rotate(angle - PI / 2);
            line(0, 0, size, -size);
            line(0, 0, -size, -size);
            popMatrix();
        }
    }
    update = function () {//update the state of the ball
        this.pposition = this.position.copy();
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    limitVelocity = function (value) {
        this.velocity.limit(value);
    }
    limitAcceleration = function (value) {
        this.acceleration.limit(value);
    }
    //interact with different objects
    checkIsInside = function (liquid) {//judge whether the ball is in the liquid
        if (this.position.x > liquid.position.x && this.position.x < liquid.position.x + liquid.size.x &&
            this.position.y > liquid.position.y && this.position.y < liquid.position.y + liquid.size.y) {
            return (true);
        } else {
            return (false);
        }
    }
    addLiquidDrag = function (liquid, showForce = false, len = 10) {//apply force
        let speed = this.velocity.mag();
        let dragMagnitude = liquid.c * speed * speed;
        let liquidDrag = this.velocity.copy();
        liquidDrag.mult(-1);
        liquidDrag.normalize();
        liquidDrag.mult(dragMagnitude);
        this.applyForce(liquidDrag, showForce, len);
    }
    applyLiquidDrag = function (liquidList, showForce = false, len = 10) {//judge and apply
        for (var i = 0; i < liquidList.length; i++) {
            if (this.checkIsInside(liquidList[i])) {
                this.addLiquidDrag(liquidList[i], showForce, len);
            }
        }
    }
    //addForces
    applyGravity = function (g, showForce = false, len = 10) {//F-g
        let gravity = new Vector(0, this.mass * g);
        this.applyForce(gravity, showForce, len);
    }
    applyFriction = function (c, showForce = false, len = 10) {//F-f
        let friction = this.velocity.copy();
        friction.mult(-1);
        friction.normalize();
        friction.mult(c);
        this.applyForce(friction, showForce, len);
    }
    applyAirDrag = function (c, showForce = false, len = 10) {//F-fAirG
        var speed = this.velocity.mag();
        var dragMagnitude = c * speed * speed;
        var airDrag = this.velocity.copy();
        airDrag.mult(-1);
        airDrag.normalize();
        airDrag.mult(dragMagnitude);
        this.applyForce(airDrag, showForce, len);
    }
    checkEdges = function () {//check if the ball hit the edge
        if (this.position.x < 0 || this.position.x > width) {
            this.velocity.x *= -0.99;
            if (this.position.x < 0) {
                this.position.x = 0;
            } else {
                this.position.x = width;
            }
        }
        if (this.position.y < 0 || this.position.y > height) {
            this.velocity.y *= -0.99;
            if (this.position.y < 0) {
                this.position.y = 0;
            } else {
                this.position.y = height;
            }
        }
    }
    display = function (f = (_) => {
        noStroke();
        fill(rgb(255, 255, 255));
        circleCenter(_.position.x, _.position.y, 10);
    }) {//draw the ball on the canvas
        f(this);
    }
}
//Classic liquid, create drag to classic balls
class Liquid extends BasicMover {
    constructor(mass = 1, position = new Vector(random(100,width-100),random(100,height-100)), velocity = new Vector(0, 0), size = new Vector(100, 100),c=0.1) {
        super(mass, position, velocity);
        this.size = size;
        this.c = c;
    }
    display = function (f = (_) => {
        noStroke();
        fill(rgba(255, 255, 255,0.2));
        rect(_.position.x, _.position.y, _.size.x,_.size.y);
    }) {//draw the ball on the canvas
        f(this);
    }
}
//引力体
class GravityMover extends BasicMover {
    constructor(mass, position = new Vector(width / 2, height / 2), velocity = new Vector(0.1, 0), G = 0.0004) {
        super(mass, position, velocity);
        this.G = G;
    }
    attract(other) {
        let force = vector_sub(this.position, other.position);
        let distance = force.mag();
        distance = constrain(distance, 5.0, 25.0);//距离限制
        let strength = (this.G * this.mass * other.mass) / (distance * distance);
        force.mult(strength);
        return force;
    }
}


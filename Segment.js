class Segment {
  constructor(param, length) {
    if (param['parent']) {
      this.position = param['parent'].secondPos.copy();
    } else {
      this.position = param['position'];
    }
    if (param['segmentNumber']) {
      this.segmentNumber = param['segmentNumber'];
    } else {
      this.segmentNumber = 1;
    }
    this.angle = 0;
    this.length = length;
    this.secondPos = this.calculateSecondPos(this.position);
    this.previousSecondPos = this.secondPos;
  }

  follow(params) {
    if (params['target']) {
      var target = params['target'].copy();
      var direction = p5.Vector.sub(target, this.position);

      this.angle = direction.heading();
      direction.setMag(this.length);
      direction.mult(-1);
      this.position = p5.Vector.add(target, direction);
    }
    if (params['angle']) {
      var target = p5.Vector.sub(this.position, p5.Vector.fromAngle(params['angle']));
      var direction = p5.Vector.sub(target, this.position);

      this.angle = params['angle'];
      direction.setMag(this.length);
      direction.mult(-1);
      this.position = p5.Vector.add(target, direction);
    }
  }

  show() {
    stroke(map(this.angle, -PI, PI, 0, 360), 360, 360);
    strokeWeight(1);
    line(this.position.x, this.position.y, this.secondPos.x, this.secondPos.y);
  }

  update() {
    this.secondPos = this.calculateSecondPos(this.position);
  }

  setBasePosition(base) {
    this.position = base.copy();
    this.secondPos = this.calculateSecondPos(this.position);
  }

  calculateSecondPos(initialPosition) {
    var changeX = this.length * cos(this.angle);
    var changeY = this.length * sin(this.angle);
    return createVector(initialPosition.x + changeX, initialPosition.y + changeY);
  }
}

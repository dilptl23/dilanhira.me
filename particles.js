/**/ /* ---- CORE ---- */
/**/ const canvas = document.createElement('canvas');
/**/ const context = canvas.getContext('2d');
/* let windowWidth = canvas.width = window.innerWidth/4;*/
/* let windowHeight = canvas.height = window.innerHeight/4;*/
let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;
canvas.width = windowWidth;
canvas.height = windowHeight;
/**/ canvas.id = 'canvas';
/**/ document.body.appendChild(canvas);
canvas.style.top = "50%";
canvas.style.left = "50%";

/**/ /* ---- CORE END ---- */
/* ---- CREATING ZONE ---- */

/* ---- SETTINGS ---- */
const numberParticlesStart = 2000;
const particleSpeed = 0.1;
const velocity = 1;
const circleWidth = 80;

/* ---- INIT ---- */
let particles = [];

const getRandomFloat = (min, max) => (Math.random() * (max - min) + min);


/* ---- Particle ---- */
function Particle (x, y) {
  this.x = x;
  this.y = y;

  this.vel = {
    x : getRandomFloat(-20, 20)/100,
    y : getRandomFloat(-20, 20)/100,
    min : getRandomFloat(2, 10),
    max : getRandomFloat(10, 100)/10
  }

  this.color = 'rgba(255, 255, 255, 0.05)';
}
Particle.prototype.render = function() {
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x, this.y, 1, 0, Math.PI * 2);
  context.fill();
};
Particle.prototype.update = function() {

  const forceDirection = {
    x: getRandomFloat(-1, 1),
    y: getRandomFloat(-1, 1),
  };

  if (Math.abs(this.vel.x + forceDirection.x) < this.vel.max) {
    this.vel.x += forceDirection.x;
  }
  if (Math.abs(this.vel.y + forceDirection.y) < this.vel.max) {
    this.vel.y += forceDirection.y;
  }

  this.x += this.vel.x * particleSpeed;
  this.y += this.vel.y * particleSpeed;

  if (Math.abs(this.vel.x) > this.vel.min) {
    this.vel.x *= velocity;
  }
  if (Math.abs(this.vel.y) > this.vel.min) {
    this.vel.y *= velocity;
  }

  this.testBorder();
};
Particle.prototype.testBorder = function() {
  if (this.x > windowWidth) {
    this.setPosition(this.x, 'x');
  } else if (this.x < 0) {
    this.setPosition(windowWidth, 'x');
  }
  if (this.y > windowHeight) {
    this.setPosition(this.y, 'y');
  } else if (this.y < 0) {
    this.setPosition(windowHeight, 'y');
  }
};
Particle.prototype.setPosition = function(pos, coor) {
  if (coor === 'x') {
    this.x = pos;
  } else if (coor === 'y') {
    this.y = pos;
  }
};

/* ---- Functions ----*/
function loop() {
  let i;
  const length = particles.length;
  for (i = 0; i < length; i++) {
    particles[i].update();
    particles[i].render();
  }
  requestAnimationFrame(loop);
}

/* ---- START ---- */
function init() {
  let i;
  for (i = 0; i < numberParticlesStart; i++) {
    const angle = Math.random() * 360;
    particles.push(new Particle(
      windowWidth * 0.5 + (Math.cos(angle) * circleWidth),
      windowHeight * 0.5 - (Math.sin(angle) * circleWidth)
  ));
  }
}
init();
window.onresize = () => {
   windowWidth = canvas.width = window.innerWidth;
   windowHeight = canvas.height = window.innerHeight;
/*let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;*/
/*canvas.width = windowWidth;
canvas.height = windowHeight;*/
   particles = [];
   context.clearRect(0,0, windowWidth, windowHeight);
   init();
}

window.addEventListener('click', () => {
  particles = [];
  context.clearRect(0,0, windowWidth, windowHeight);
  init();
});


loop();
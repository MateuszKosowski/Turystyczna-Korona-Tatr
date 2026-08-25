"use strict";

const flyer = document.querySelector(".mountain-flyer");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

let x = window.innerWidth * 0.12;
let y = window.innerHeight * 0.16;
let velocityX = 185;
let velocityY = 145;
let previousTime = performance.now();
let animationFrameId;

function renderPosition() {
  flyer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function keepInsideViewport() {
  x = Math.min(Math.max(0, x), Math.max(0, window.innerWidth - flyer.offsetWidth));
  y = Math.min(Math.max(0, y), Math.max(0, window.innerHeight - flyer.offsetHeight));

  if (!reduceMotion.matches) {
    renderPosition();
  }
}

function animate(currentTime) {
  const elapsed = Math.min((currentTime - previousTime) / 1000, 0.04);
  const maxX = Math.max(0, window.innerWidth - flyer.offsetWidth);
  const maxY = Math.max(0, window.innerHeight - flyer.offsetHeight);

  x += velocityX * elapsed;
  y += velocityY * elapsed;

  if (x <= 0 || x >= maxX) {
    x = Math.min(Math.max(0, x), maxX);
    velocityX *= -1;
  }

  if (y <= 0 || y >= maxY) {
    y = Math.min(Math.max(0, y), maxY);
    velocityY *= -1;
  }

  renderPosition();
  previousTime = currentTime;
  animationFrameId = requestAnimationFrame(animate);
}

function updateMotionPreference() {
  if (reduceMotion.matches) {
    cancelAnimationFrame(animationFrameId);
    flyer.style.removeProperty("transform");
    return;
  }

  previousTime = performance.now();
  renderPosition();
  animationFrameId = requestAnimationFrame(animate);
}

window.addEventListener("resize", keepInsideViewport);
reduceMotion.addEventListener("change", updateMotionPreference);

keepInsideViewport();
updateMotionPreference();

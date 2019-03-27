declare const Vue: any;

const v = new Vue({
  el: '#app',
  data: {
    boxes: 100
  }
});

const iterations = 50;
const multiplier = 100000000000;

function calculatePrimes(iterations: number, multiplier: number) {
  const primes = [];
  for (let i = 0; i < iterations; i++) {
    const candidate = i * (multiplier * Math.random());
    let isPrime = true;
    for (let c = 2; c <= Math.sqrt(candidate); ++c) {
      if (candidate % c === 0) {
        // not prime
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
  }
  return primes;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function doPointlessComputationsWithBlocking() {
  const primes = calculatePrimes(iterations, multiplier);
  console.log(primes);
}

function getRandomNumber(windowMeasurement: number) {
  const randomNumber = Math.floor(Math.random() * (windowMeasurement / 10));
  return (randomNumber > windowMeasurement / 10) ? windowMeasurement / 10 : randomNumber;
}

function shapeShiftBoxes() {
  const boxes = <NodeListOf<HTMLElement>>document.querySelectorAll('.box');
  boxes.forEach((box) => {
    const s = box.style;
    s.height = `${getRandomNumber(window.innerHeight)}px`;
    s.width = `${getRandomNumber(window.innerWidth)}px`;
    s.backgroundColor = getRandomColor();
    s.borderRadius = `${getRandomNumber(window.innerWidth)}px`;
  });
}

shapeShiftBoxes();
setInterval(() => {
  // doPointlessComputationsWithBlocking();
  // window.requestAnimationFrame(shapeShiftBoxes);
  shapeShiftBoxes();
}, 500);

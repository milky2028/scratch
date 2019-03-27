declare const Vue: any;

const v = new Vue({
  el: '#app',
  data: {
    boxes: 100
  }
});

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

function doPointlessComputationsWithBlocking() {
  const primes = calculatePrimes(50, 100000000000);
  console.log(primes);
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function getRandomNumber(windowMeasurement: number) {
  const randomNumber = Math.floor(Math.random() * (windowMeasurement / 10));
  return (randomNumber > windowMeasurement / 10) ? windowMeasurement / 10 : randomNumber;
}

function shapeShiftBoxes() {
  const boxes = document.querySelectorAll('.box') as NodeListOf<HTMLElement>;
  boxes.forEach((box) => {
    const style = box.style;
    style.height = `${getRandomNumber(window.innerHeight)}px`;
    style.width = `${getRandomNumber(window.innerWidth)}px`;
    style.backgroundColor = getRandomColor();
    style.borderRadius = `${getRandomNumber(window.innerWidth)}px`;
  });
}

// data from reload
// noBlockingCode: 52.8 fps avg
// blockingCode: 14 fps avg
// inWorker: 44.4 fps avg
shapeShiftBoxes();
const worker = new Worker('js/worker.js');
setInterval(() => {
  // worker.postMessage({});
  // doPointlessComputationsWithBlocking();
  // window.requestAnimationFrame(shapeShiftBoxes);
  shapeShiftBoxes();
}, 500);

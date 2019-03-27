const iterations = 50;
const multiplier = 1000000000;

function calculatePrimes(iterations: number, multiplier: number) {
  var primes = [];
  for (var i = 0; i < iterations; i++) {
    var candidate = i * (multiplier * Math.random());
    var isPrime = true;
    for (var c = 2; c <= Math.sqrt(candidate); ++c) {
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
  var primes = calculatePrimes(iterations, multiplier);
  console.log(primes);
}

// function shapeShiftBox() {
//   const box = <HTMLElement>document.querySelector('#box');
//   box.style.height = `${Math.floor(Math.random() * 700)}px`;
// }

// setTimeout(() => {
//   shapeShiftBox();
// }, 5000);

// doPointlessComputationsWithBlocking();

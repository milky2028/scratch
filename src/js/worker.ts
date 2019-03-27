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

self.onmessage = () => {
  doPointlessComputationsWithBlocking();
};

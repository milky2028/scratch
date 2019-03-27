declare const Vue: any;

const v = new Vue({
  el: '#app',
  data: {
    boxes: 100
  }
});

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

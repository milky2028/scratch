class WorkingClass {
  async thingOne() {
    await postMessage('stream');
  }

  thingTwo() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('data from worker');
      }, 3000);
    });
  }
}

self.addEventListener('message', async (msg) => {
  const workingClass = new WorkingClass();
  const res = workingClass[msg.data.fn]();
  postMessage(await res);
});

const fs = require('fs');
const https = require('https');

const getData = (url) => {
  return new Promise((resolve, reject) => {
    let data = '';
    https
      .get(url, (resp) => {
        resp.on('data', (chunk) => (data += chunk));
        resp.on('end', () => resolve(JSON.parse(data)));
      })
      .on('error', (err) => reject(new Error(err)));
  });
};

const createURL = (pageNumber) =>
  `https://jsonmock.hackerrank.com/api/article_users?page=${pageNumber}`;

const filterUsers = (data, threshold) => {
  return data
    .filter(({ submission_count }) => submission_count > threshold)
    .map(({ username }) => username);
};

async function getUsernames(threshold) {
  const resultData = await getData(createURL(1));
  const totalPages = resultData.total_pages;
  let users = filterUsers(resultData.data, threshold);

  const requests = [];
  for (let i = 2; i <= totalPages; i++) {
    requests.push(
      getData(createURL(i)).then(
        ({ data }) => (users = [...users, ...filterUsers(data, threshold)])
      )
    );
  }

  await Promise.all(requests);
  return users;
}

function main() {
  const threshold = 10;
  getUsernames(threshold).then((result) => console.log(result));
}

main();

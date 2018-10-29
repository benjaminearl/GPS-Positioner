const fetch = require('node-fetch');
const fs = require('fs');

fetch('https://www.n2yo.com/rest/v1/satellite/positions/41328/52.070499/4.300700/0/1/&apiKey=4J989X-GZMXTK-JW4T2J-3WEU')
    .then(res => res.json());

console.log(res);


    
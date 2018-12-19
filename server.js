const fs = require('fs');
const express = require('express');
const app = express();
const moment = require('moment');
const EOL = require('os').EOL;


function getGEOJSON(since) {
	const files = fs.readdirSync('./satInfo');
	const jsonFiles = [];

	let response = null;
	let timestamps = [];
	files.forEach((file) => {
		if (file.substr(0, 1) !== '.') {
			const filenameParts = file.split('.');
			

			timestamps.push(parseInt(filenameParts[0]));
		}
	});

	const lastTimestamp = timestamps[timestamps.length-1];

	if (!since || since < lastTimestamp) {
		const json = JSON.parse(fs.readFileSync('./satInfo/'+lastTimestamp+'.json'));
		const image = lastTimestamp + '.jpg';

		const coords = json.geometry.coordinates[0].split(',');

		json.geometry.coordinates = [
			parseFloat(coords[0]),
			parseFloat(coords[1]),
		];
		// console.log(json);

		if (fs.existsSync('./images/'+image)) {
			response = {
				time: lastTimestamp,
				json: json,
				image: image,
			};
		}

	}

	return response;
}

// getGEOJSON();
app.get('/', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);

	data = getGEOJSON(req.query.since);
	res.json(data);
});

app.listen(3000, () => console.log('Example app listening on port 3000!')); 

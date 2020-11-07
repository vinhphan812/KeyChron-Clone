const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');


const host = process.env.PORT || 3000;

const app = express();

app.use(express.static('assets'));

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, './assets/view/landingpage.html'));
})

app.get('/HOME', (req, res) => {
     res.sendFile(path.join(__dirname, './assets/view/index.html'));
})

app.listen(host, function() {
     console.log(`server running is http://localhost:${host}`);
})
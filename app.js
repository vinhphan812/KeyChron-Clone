const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const DataBase = require('./Control/dataBase');

const db = new DataBase();

const host = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, './assets/view/landingpage.html'));
})

app.get('/HOME', (req, res) => {
     res.sendFile(path.join(__dirname, './assets/view/index.html'));
})

app.get('/data', async(req, res) => {
     res.json(await db.getData());
})

app.post('/data', async(req, res) => {
     const user = req.body;
     if (user.user && user.name && user.email && user.pass)
          await db.addUser({ user: user.user, pass: user.pass, name: user.name, email: user.email });
     else
          return res.send('Wrong info');
     res.send("oki");
})

app.listen(host, function() {
     console.log(`server running is http://localhost:${host}`);
})
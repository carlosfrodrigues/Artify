const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(express.json());
app.use(routes);

app.use('/img', express.static(__dirname + '/Images/'));


app.listen(3333);
require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const colors = require('colors/safe');
const PORT = process.env.PORT;

const charts = require('./fakedbchart');
const chartsArray = [];
for(const chart in charts) {
    chartsArray.push(charts[chart]);
}

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));

app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.render("home", { charts: chartsArray });
})

app.get('/chart/:id', (req, res) => {
    res.render("chart", {id: req.params.id, charts:chartsArray, data: [19,21]});
})

app.listen(PORT, () => {
    console.log(colors.brightGreen.underline(`Listening on port ${PORT}`));
});
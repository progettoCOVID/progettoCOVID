const express = require('express')

const charts = require('../fakedbchart');

const app = express()

const chartsArray = [];
for(const chart in charts) {
    chartsArray.push(charts[chart]);
}

exports.get_home = (req, res) => {
    res.render("home", { charts: chartsArray });
}

exports.get_charts = (req, res) => {
    res.render("chart", {id: req.params.id, charts:chartsArray, data: [19,21]});
}

const express = require('express');
/* const sqlite = require('sqlite'); */
const sqlite3 = require('sqlite3')
const charts = require('../fakedbchart');
    
export async function openDb () {
    return open({
      filename: '/tmp/database.db',
      driver: sqlite3.Database
    })
}

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

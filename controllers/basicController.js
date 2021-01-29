const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/tabella.db')
const charts = require('../fakedbchart');

var rows = [];

db.serialize(() => {
    db.each("SELECT prs_date FROM Prescrizioni", (err, row) => {
        let tmp = row['prs_date'].split(' ')[0];
        // console.log(tmp);
        rows.push(tmp);
    })
})
db.close();


const app = express()

const chartsArray = [];
for(const chart in charts) {
    chartsArray.push(charts[chart]);
}

exports.get_home = (req, res) => {
    res.render("home", { charts: chartsArray });
}

exports.get_charts = (req, res) => {
    const rowsArray = [...new Set(rows)];
    // console.log(rowsArray);
    res.render("chart", {id: req.params.id, charts: chartsArray, dataX: rowsArray});
}

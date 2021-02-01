const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/tabella.db')
const charts = require('../fakedbchart');
const app = express()

//idrox
var nslDate = [{}]
db.serialize(() => {
    let i = 0;
    db.each("SELECT prs_date, prs_nsl_num FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id WHERE Farmaci.frmc_atc5 = 'IDROXICLOROCHINA'", (err, row) => {
        i++;
        nslDate.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
    })
})
db.close();

const chartsArray = [];
for(const chart in charts) {
    chartsArray.push(charts[chart]);
}

exports.get_home = (req, res) => {
    res.render("home", {id: req.params.id, charts: chartsArray})
    
}

exports.get_charts = (req, res) => {
    const data = get_idrox();
    res.render("chart", {id: req.params.id, charts: chartsArray, data: data});
}

const get_idrox = () => {
    var nslDateString = JSON.stringify({nslDate})
    return nslDateString
}

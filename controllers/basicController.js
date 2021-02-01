const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/tabella.db')
const charts = require('../fakedbchart');

var nslDate = [{}]
db.serialize(() => {
    let i = 0;
    db.each("SELECT prs_date, prs_nsl_num FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id WHERE Farmaci.frmc_atc5 = 'IDROXICLOROCHINA'", (err, row) => {
        i++;
        nslDate.push('{date: ' + row['prs_date'].split(' ')[0] + ", noso: " + row['prs_nsl_num'] + '}')
    })
})
db.close();


const app = express()

const chartsArray = [];
for(const chart in charts) {
    chartsArray.push(charts[chart]);
}

exports.get_home = (req, res) => {
    
}

exports.get_charts = (req, res) => {
    var nslDateString = JSON.stringify(Object.assign({}, nslDate))
    var nslDateJSON = JSON.parse(nslDateString)
    console.log(nslDateJSON);
    res.render("chart", {id: req.params.id, charts: chartsArray, data: nslDateJSON});
}

const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/tabella.db')
const charts = require('../fakedbchart');
const app = express()

//idrox
var nslDate = [{}]
var nslDateGlico = [{}]
var nslDateOssigeno = [{}]
db.serialize(() => {
    let i = 0;
    db.each("SELECT prs_date, prs_nsl_num " +
                "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id " +
                "WHERE Farmaci.frmc_atc5 = 'IDROXICLOROCHINA'", (err, row) => {
        i++;
        nslDate.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
    })
    db.each("SELECT prs_date, prs_nsl_num " +
                "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id " +
                "WHERE Farmaci.frmc_atc5 LIKE 'Desamentasone%' OR Farmaci.frmc_atc5 LIKE '%predniso%'", (err, row) => {
        i++;
        nslDateGlico.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
    })
    db.each("SELECT prs_date, prs_nsl_num " +
                "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id " +
                "WHERE Farmaci.frmc_atc5 LIKE '%ossigeno%'", (err, row) => {
        i++;
        nslDateOssigeno.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
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
    const dataIdrox = get_idrox();
    const dataGlico = get_glico();
    const dataOssigeno = get_ossigeno();
    res.render("chart", { id: req.params.id, 
                            charts: chartsArray, 
                            dataIdrox: dataIdrox,
                            dataGlico: dataGlico,
                            dataOssigeno: dataOssigeno});
}

const get_idrox = () => {
    var nslDateString = JSON.stringify({nslDate})
    return nslDateString
}

const get_glico = () => {
    var nslDateStringGlico = JSON.stringify({nslDateGlico})
    return nslDateStringGlico
}

const get_ossigeno = () => {
    var nslDateStringOssigeno = JSON.stringify({nslDateOssigeno})
    return nslDateStringOssigeno
}

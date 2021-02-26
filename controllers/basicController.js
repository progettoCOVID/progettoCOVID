    const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/tabella.db')
const charts = require('../fakedbchart');
const idroxController = require('../controllers/idroxController')
const glicoController = require('../controllers/glicoController')
const ossigenoController = require('../controllers/ossigenoController')
const antibioticiController = require('../controllers/antibioticiController')
const antiviraliController = require('../controllers/antiviraliController')
const eparineController = require('../controllers/eparineController')
// const farm = require('../controllers/farmaciController');

const diabeticiController = require('../controllers/diabeticiController')
const cardiopaticiController = require('../controllers/cardiopaticiController')


const chartsArray = [];
for(const chart in charts) {
    chartsArray.push(charts[chart]);
}

exports.get_home = (req, res) => {
    res.render("home", {id: req.params.id, charts: chartsArray})
    
}

const get_terapietempo = req => {
    const dataIdrox = idroxController.get_dates();
    const dataGlico = glicoController.get_dates();
    const dataOssigeno = ossigenoController.get_dates();
    const dataAntibiotici = antibioticiController.get_dates();
    const dataEparine = eparineController.get_dates();
    const dataAntivirali = antiviraliController.get_dates()
    return (
        { id: req.params.id, 
                            charts: chartsArray, 
                            dataIdrox: dataIdrox,
                            dataGlico: dataGlico,
                            dataOssigeno: dataOssigeno,
                            dataAntibiotici: dataAntibiotici,
                            dataAntivirali: dataAntivirali,
                            dataEparine: dataEparine
                    });
}

const get_comorbidita = req => {
    const dataDiabetici = diabeticiController.get_dates();
    const dataCardiopatici = cardiopaticiController.get_dates();
    return (
        {
            id: req.params.id,
            charts: chartsArray,
            dataDiabetici: dataDiabetici,
            dataCardiopatici: dataCardiopatici
        }
    )
}

exports.get_charts = (req, res) => {
    if (req.params.id === 'terapietempo') {
        res.render("chartTerapieTempo", get_terapietempo(req))
    } else if(req.params.id === 'comorbidita'){
        res.render("chartComorbidita", get_comorbidita(req))
    }
}

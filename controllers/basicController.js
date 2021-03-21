const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db/tabella.db')
const charts = require('../fakedbchart');
const idroxController = require('../controllers/idroxController')
const glicoController = require('../controllers/glicoController')
/* const ossigenoController = require('../controllers/ossigenoController') */
const antibioticiController = require('../controllers/antibioticiController')
const antiviraliController = require('../controllers/antiviraliController')
const eparineController = require('../controllers/eparineController')
// const farm = require('../controllers/farmaciController');
const vitamiteController = require('../controllers/vitamineController')

const diabeticiController = require('../controllers/diabeticiController')
const cardiopaticiController = require('../controllers/cardiopaticiController')

const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const months_restr = ['GEN', 'FEB', 'MAR', 'APR', 'MAY', 'JUNE', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const months_full = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']

const getX = chartData => {
    let dataX = [];
    chartData.forEach(el => {
        el = el + ''
        el = el.split(",")

        let tmp = el[0].split('-');
        // giorno mese - 20 || es. 15 Luglio - 20
        let month = months[months_restr.indexOf(tmp[1])];
        dataX.push(`${tmp[0]}-${month}-${tmp[2]}20`);
    })
    dataX.splice(0, 1)
    dataX = [... new Set(dataX)]
    return dataX;
}

const getY = (dataX, chartData) => {
    let dataY = [];
    dataX.forEach(() => dataY.push(0))
    dataX.forEach(dx => {
        chartData.forEach(el => {
            el = el + ''
            el = el.split(",")
            let tmp = el[0].split('-')
            let month = months[months_restr.indexOf(tmp[1])];
            if (JSON.stringify(dx) === JSON.stringify(`${tmp[0]}-${month}-${tmp[2]}20`)) {
                dataY[dataX.indexOf(dx)] += 1
            }
        })
    })
    return dataY;
}

const getDates = (dataX, dataY) => {
    let dates = [];
    for (i = 0; i < dataX.length; i++) {
        let obj = {};
        obj.x = new Date(dataX[i].split('-')[2], dataX[i].split('-')[1], dataX[i].split('-')[0]);
        obj.y = dataY[i]
        dates.push(obj);
    }
    return dates.sort((a, b) => a.x - b.x);
}

const formatDate = date => {
    let monthRestr = date.split(' ')[1]
    let index = months_restr.indexOf(monthRestr.toUpperCase())

    return date.split(' ')[2] + " " + months_full[index] + " " + date.split(' ')[3]
}

const getMassimo = (data) => {
    let max = {
        date: '',
        value: -1
    };
    
    data.forEach(d => {
        if (d.y > max.value) {
            max.value = d.y;
            max.date = formatDate(d.x + "");
        }
    });
    
    return max.date + " - " + max.value + ' pazienti';
}

const getPazientiTotali = (data) => {
    let data2 = []
    data.forEach(d => {
        let a = d + ""
        data2.push(a.split(',')[1])
    });

    let unique = [...new Set(data2)]

    return unique.length - 1  + ""
}

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
    /* const dataOssigeno = ossigenoController.get_dates(); */
    const dataAntibiotici = antibioticiController.get_dates();
    const dataEparine = eparineController.get_dates();
    const dataAntivirali = antiviraliController.get_dates()
    const dataVitamine = vitamiteController.get_dates();


    // IDROXICLOROCHINA
    let chartDataIdrox = JSON.parse(dataIdrox)
    chartDataIdrox = Object.values(chartDataIdrox['nslDateIdrox'])
    const XIdrox = getX(chartDataIdrox)
    const YIdrox = getY(XIdrox, chartDataIdrox)
    const fullIdrox = getDates(XIdrox, YIdrox)

    // GLICORTICOIDI
    let chartDataGlico = JSON.parse(dataGlico)
    chartDataGlico = Object.values(chartDataGlico['nslDateGlico'])
    const XGlico = getX(chartDataGlico)
    const YGlico = getY(XGlico, chartDataGlico)
    const fullGlico = getDates(XGlico, YGlico)

    // OSSIGENO
    /* let chartDataOssigeno = JSON.parse(dataOssigeno)
    chartDataOssigeno = Object.values(chartDataOssigeno['nslDateOssigeno'])
    const XOssigeno = getX(chartDataOssigeno)
    const YOssigeno = getY(XOssigeno, chartDataOssigeno)
    const fullOssigeno = getDates(XOssigeno, YOssigeno) */

    // ANTIBIOTICI
    let chartDataAntibiotici = JSON.parse(dataAntibiotici)
    chartDataAntibiotici = Object.values(chartDataAntibiotici['nslDateAntibiotici'])
    const XAntibiotici = getX(chartDataAntibiotici)
    const YAntibiotici = getY(XAntibiotici, chartDataAntibiotici)
    const fullAntibiotici = getDates(XAntibiotici, YAntibiotici)

    // ANTIVIRALI
    let chartDataAntivirali = JSON.parse(dataAntivirali)
    chartDataAntivirali = Object.values(chartDataAntivirali['nslDateAntivirali'])
    const XAntivirali = getX(chartDataAntivirali)
    const YAntivirali = getY(XAntivirali, chartDataAntivirali)
    const fullAntivirali = getDates(XAntivirali, YAntivirali)

    // VITAMINE
    let chartDataVitamine = JSON.parse(dataVitamine)
    chartDataVitamine = Object.values(chartDataVitamine['nslDateVitamine'])
    const XVitamine = getX(chartDataVitamine)
    const YVitamine = getY(XVitamine, chartDataVitamine)
    const fullVitamine = getDates(XVitamine, YVitamine)

    const data = [
        {
            'name': 'Idroxiclorochina',
            'data': {
                totalePazienti: getPazientiTotali(chartDataIdrox),
                inizio : formatDate(fullIdrox[0].x  + ""),
                fine   : formatDate(fullIdrox[fullIdrox.length-1].x + ""),
                massimo: getMassimo(fullIdrox),
                decessi: 'NaN'
            },
            'active': 'active'
        },
        {
            'name': 'Glicorticoidi',
            'data': {
                totalePazienti: getPazientiTotali(chartDataGlico),
                inizio : formatDate(fullGlico[0].x  + ""),
                fine   : formatDate(fullGlico[fullGlico.length-1].x + ""),
                massimo: getMassimo(fullGlico),
                decessi: 'NaN'
            },
            'active': ''
        },
        /* {
            'name': 'Ossigeno',
            'data': {
                totalePazienti: getPazientiTotali(chartDataOssigeno),
                inizio : formatDate(fullOssigeno[0].x  + ""),
                fine   : formatDate(fullOssigeno[fullOssigeno.length-1].x + ""),
                massimo: getMassimo(fullOssigeno),
                decessi: 'NaN'
            },
            'active': ''
        }, */
        {
            'name': 'Antibiotici',
            'data': {
                totalePazienti: getPazientiTotali(chartDataAntibiotici),
                inizio : formatDate(fullAntibiotici[0].x  + ""),
                fine   : formatDate(fullAntibiotici[fullAntibiotici.length-1].x + ""),
                massimo: getMassimo(fullAntibiotici),
                decessi: 'NaN'
            },
            'active': ''
        },
        {
            'name': 'Antivirali',
            'data': {
                totalePazienti: getPazientiTotali(chartDataAntivirali),
                inizio : formatDate(fullAntivirali[0].x  + ""),
                fine   : formatDate(fullAntivirali[fullAntivirali.length-1].x + ""),
                massimo: getMassimo(fullAntivirali),
                decessi: 'NaN'
            },
            'active': ''
        },
        {
            'name': 'Vitamine',
            'data': {
                totalePazienti: getPazientiTotali(chartDataVitamine),
                inizio : formatDate(fullVitamine[0].x  + ""),
                fine   : formatDate(fullVitamine[fullVitamine.length-1].x + ""),
                massimo: getMassimo(fullVitamine),
                decessi: 'NaN'
            },
            'active': ''
        }
    ]


    return (
        { id: req.params.id, 
                            charts: chartsArray, 
                            dataIdrox: dataIdrox,
                            dataGlico: dataGlico,
                            /* dataOssigeno: dataOssigeno, */
                            dataAntibiotici: dataAntibiotici,
                            dataAntivirali: dataAntivirali,
                            dataEparine: dataEparine,
                            dataVitamine: dataVitamine,
                            data: data
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

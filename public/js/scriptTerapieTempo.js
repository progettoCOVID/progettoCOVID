// import { getX, getY, getDates } from './getChartValues.js';

let chartDataIdrox = document.getElementById("chart-data").dataset.chartidrox;
let chartDataGlico = document.getElementById("chart-data").dataset.chartglico;
let chartDataOssigeno = document.getElementById("chart-data").dataset.chartossigeno;
let chartDataAntibiotici = document.getElementById("chart-data").dataset.chartantibiotici;
let chartDataAntivirali = document.getElementById("chart-data").dataset.chartantivirali;
let chartDataVitamine = document.getElementById('chart-data').dataset.chartvitamine;
//let chartDataEparine = document.getElementById('chart-data').dataset.charteparine;

chartDataIdrox = JSON.parse(chartDataIdrox)
chartDataIdrox = Object.values(chartDataIdrox['nslDateIdrox'])

chartDataGlico = JSON.parse(chartDataGlico)
chartDataGlico = Object.values(chartDataGlico['nslDateGlico'])

chartDataOssigeno = JSON.parse(chartDataOssigeno)
chartDataOssigeno = Object.values(chartDataOssigeno['nslDateOssigeno'])

chartDataAntibiotici = JSON.parse(chartDataAntibiotici)
chartDataAntibiotici = Object.values(chartDataAntibiotici['nslDateAntibiotici'])

chartDataAntivirali = JSON.parse(chartDataAntivirali)
chartDataAntivirali = Object.values(chartDataAntivirali['nslDateAntivirali'])

chartDataVitamine = JSON.parse(chartDataVitamine)
chartDataVitamine = Object.values(chartDataVitamine['nslDateVitamine']);

/* chartDataEparine = JSON.parse(chartDataEparine)
chartDataEparine = Object.values(chartDataEparine['nslDateEparine']) */

// Gennaio, Febbraio, Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre, Ottobre, Novembre, Dicembre
const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const months_restr = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC']
const days_in_months = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];


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
    return dates;
}



/* IDROX */
let dataXIdrox = getX(chartDataIdrox);
let dataYIdrox = getY(dataXIdrox, chartDataIdrox)
var datesIdrox = getDates(dataXIdrox, dataYIdrox)
var dates2Idrox = datesIdrox.sort((a, b) => b.x - a.x);


/* GLICO */
let dataXGlico = getX(chartDataGlico)
let dataYGlico = getY(dataXGlico, chartDataGlico)
var datesGlico = getDates(dataXGlico, dataYGlico)
var dates2Glico = datesGlico.sort((a, b) => b.x - a.x);


/* OSSIGENO */
let dataXOssigeno = getX(chartDataOssigeno)
let dataYOssigeno = getY(dataXOssigeno, chartDataOssigeno)
var datesOssigeno = getDates(dataXOssigeno, dataYOssigeno)
var dates2Ossigeno = datesOssigeno.sort((a, b) => b.x - a.x);


/* ANTIBIOTICI */
let dataXAntibiotici = getX(chartDataAntibiotici)
let dataYAntibiotici = getY(dataXAntibiotici, chartDataAntibiotici)
var datesAntibiotici = getDates(dataXAntibiotici, dataYAntibiotici)
var dates2Antibiotici = datesAntibiotici.sort((a, b) => b.x - a.x)


/* ANTIVIRALI */
let dataXAntivirali = getX(chartDataAntivirali)
let dataYAntivirali = getY(dataXAntivirali, chartDataAntivirali)
var datesAntivirali = getDates(dataXAntivirali, dataYAntivirali)
var dates2Antivirali = datesAntivirali.sort((a, b) => b.x - a.x)


/* EPARINE */ 
/* console.log(chartDataEparine); */
/* let dataXEparine = getX(chartDataEparine)
let dataYEparine = getY(dataXEparine, chartDataEparine)
var datesEparine = getDates(dataXEparine, dataYEparine)
var dates2Eparine = datesEparine.sort((a, b) => b.x - a.x) */


/* VITAMINE */
let dataXVitamine = getX(chartDataVitamine)
let dataYVitamine = getY(dataXVitamine, chartDataVitamine)
var datesVitamine = getDates(dataXVitamine, dataYVitamine)
var dates2Vitamine = datesVitamine.sort((a, b) => b.x - a.x)



const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Idroxiclorochina',
            borderColor: 'red',
            backgroundColor: 'red',
            fill: false,
            data: dates2Idrox
        },
        {
            label: 'Glicorticoidi',
            borderColor: 'yellow',
            backgroundColor: 'yellow',
            fill: false,
            data: dates2Glico
        },
        {
            label: 'Ossigeno',
            borderColor: 'lightblue',
            backgroundColor: 'lightblue',
            fill: false,
            data: dates2Ossigeno
        },
        {
            label: 'Antibiotici',
            borderColor: 'white',
            backgroundColor: 'white',
            fill: false,
            data: dates2Antibiotici
        },
        {
            label: 'Antivirali',
            borderColor: '#975acf',
            backgroundColor: '#975acf',
            fill: false,
            data: dates2Antivirali
        },
        /* {
            label: 'Eparine',
            borderColor: 'green',
            backgroundColor: 'green',
            fill: false,
            data: dates2Eparine
        } */
        {
            label: 'Vitamine',
            borderColor: '#4AE54A',
            backgroundColor: '#4AE54A',
            fill: false,
            data: dates2Vitamine
        }],
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true
                },
                type: 'time',
                time: {
                    displayFormats: { 'day': 'MM/YY' },
                    tooltipFormat: 'DD/MM/YY',
                    unit: 'month'
                }
            }],
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
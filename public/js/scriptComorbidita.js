// import { getX, getY, getDates } from './getChartValues.js';

let chartDataDiabetici = document.getElementById("chart-data").dataset.chartdiabetici;
let chartDataCardiopatici = document.getElementById("chart-data").dataset.chartcardiopatici;

chartDataDiabetici = JSON.parse(chartDataDiabetici)
chartDataDiabetici = Object.values(chartDataDiabetici['nslDateDiabetici'])

chartDataCardiopatici = JSON.parse(chartDataCardiopatici)
chartDataCardiopatici = Object.values(chartDataCardiopatici['nslDateCardiopatici'])

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



/* DIABETICI */
let dataXDiabetici = getX(chartDataDiabetici);
let dataYDiabetici = getY(dataXDiabetici, chartDataDiabetici)
var datesDiabetici = getDates(dataXDiabetici, dataYDiabetici)
var dates2Diabetici = datesDiabetici.sort((a, b) => b.x - a.x);


/* CARDIOPATICI E IPERTENSIONE */
let dataXCardiopatici = getX(chartDataCardiopatici);
let dataYCardiopatici = getY(dataXCardiopatici, chartDataCardiopatici)
var datesCardiopatici = getDates(dataXCardiopatici, dataYCardiopatici)
var dates2Cardiopatici = datesCardiopatici.sort((a, b) => b.x - a.x);



const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Pazienti Diabetici',
            borderColor: '#D22A85',
            backgroundColor: '#D22A85',
            fill: false,
            data: dates2Diabetici,
            yAxisID: 'rightAx'
        },
        {
            label: 'Pazienti Cardiopatici / Ipertensione',
            borderColor: '#A18499',
            backgroundColor: '#A18499',
            fill: false,
            data: dates2Cardiopatici,
            yAxisID: 'leftAx'
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
                id: 'leftAx',
                ticks: {
                    beginAtZero: true
                },
                position: 'left'
            }, {
                id: 'rightAx',
                ticks: {
                    beginAtZero: true
                },
                position: 'right'
            }]
        }
    }
});
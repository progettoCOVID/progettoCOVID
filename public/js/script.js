let chartData = document.getElementById("chart-data").dataset.chartdata;
chartData = JSON.parse(chartData)
chartData = Object.values(chartData['nslDate'])

// Gennaio, Febbraio, Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre, Ottobre, Novembre, Dicembre
const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const months_restr = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC']
const days_in_months = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];

let dataX = [];
chartData.forEach(el => {
    el = el + ''
    el = el.split(",")

    let tmp = el[0].split('-');
    // giorno mese - 20 || es. 15 Luglio - 20
    let month = months[months_restr.indexOf(tmp[1])];
    // let day = (tmp[0] < 10)? '0'+tmp[0] : tmp[0];
    dataX.push(`${tmp[0]}-${month}-${tmp[2]}20`);
})
dataX.splice(0, 1)
dataX = [... new Set(dataX)]

let dataY = []
for(i = 0; i < dataX.length; i++){
    dataY.push(0)
}
console.log(dataY.length + ' - ' + dataX.length)
dataX.forEach(dx => {
    chartData.forEach(el => {
        el = el + ''
        el = el.split(",")
        let tmp = el[0].split('-')
        let month = months[months_restr.indexOf(tmp[1])];
        if(JSON.stringify(dx) === JSON.stringify(`${tmp[0]}-${month}-${tmp[2]}20`)){
            dataY[dataX.indexOf(dx)] += 1
        }
    })
})
console.log(dataY)

// console.log(xEle);
var dates = [];
for(i=0; i < dataX.length; i++){
    let obj = {};
    obj.x = new Date(dataX[i].split('-')[2], dataX[i].split('-')[1], dataX[i].split('-')[0]);
    obj.y = dataY[i]
    dates.push(obj);
}


const ctx = document.getElementById("chart").getContext("2d");
var dates2 = dates.sort((a,b) => b.x - a.x);
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: 'Idroxiclorochina',
            borderColor: 'red',
            backgroundColor: 'red',
            fill: false,
            data: dates2
         }]
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
                  displayFormats: {'day': 'MM/YY'},
                  tooltipFormat: 'DD/MM/YY',
                  unit: 'month',
                    min: '2020',
                    max: '2021'
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
let chartData = document.getElementById("chart-data").dataset.chartdata;
chartData = chartData.split('[object Object],')[1];
chartData = JSON.stringify({chartData})
chartData = JSON.parse(chartData)
console.log(chartData)
// console.log(typeof chartData, chartData);


// Gennaio, Febbraio, Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre, Ottobre, Novembre, Dicembre
const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const months_restr = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC']
const days_in_months = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];



let dataX = [];
chartData.forEach(el => {
    let tmp = el[0].split('-');
    // giorno mese - 20 || es. 15 Luglio - 20
    let month = months[months_restr.indexOf(tmp[1])];
    // let day = (tmp[0] < 10)? '0'+tmp[0] : tmp[0];
    dataX.push(`${tmp[0]}-${month}-${tmp[2]}20`);
})
// console.log(dataX);



var xEle = [];

days_in_months.forEach((ele, index) => {
    for (let i=1; i<=ele; i++) {
        let day = (i < 10)? '0'+i : i;
        xEle.push(`${day}-${months[index]}-2020`);
        /*if(i==1 || i==15){
            xEle.push(`${i} ${months[index]} - 20`);
        }*/
    }
})

// console.log(xEle);

var dates = [];
dataX.forEach(date => {
    let obj = {};
    obj.x = new Date(date.split('-')[2], date.split('-')[1], date.split('-')[0]);
    obj.y = Math.floor(Math.random() * (30 - 1) + 1);
    dates.push(obj);
})


const ctx = document.getElementById("chart").getContext("2d");
var dates2 = dates.sort((a,b) => b.x - a.x);
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xEle,
        datasets: [{
            label: 'My First dataset',
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
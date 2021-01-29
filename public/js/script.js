let chartData = document.getElementById("chart-data").dataset.chartdata;
chartData = Array.from(chartData.split(","));
// console.log(chartData);


// console.log(typeof chartData, chartData);


// Gennaio, Febbraio, Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre, Ottobre, Novembre, Dicembre
const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
const months_restr = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC']
const days_in_months = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];



let dataX = [];
chartData.forEach(el => {
    let tmp = el.split('-');
    // giorno mese - 20 || es. 15 Luglio - 20
    let month = months[months_restr.indexOf(tmp[1])];
    let day = (tmp[0] < 10)? '0'+tmp[0] : tmp[0];
    dataX.push(`${day} ${month} - ${tmp[2]}`);
})
// console.log(dataX);



var xEle = [];

days_in_months.forEach((ele, index) => {
    for (let i=1; i<=ele; i++) {
        let day = (i < 10)? '0'+i : i;
        xEle.push(`${day} ${months[index]} - 20`);
        /*if(i==1 || i==15){
            xEle.push(`${i} ${months[index]} - 20`);
        }*/
    }
})

// console.log(xEle);

var dates = [];
dataX.forEach(date => {
    let obj = {};
    obj.x = date;
    obj.y = Math.floor(Math.random() * (30 - 1) + 1);
    dates.push(obj);
})
console.log(dates);
// Math.random() * (max - min) + min;


const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: xEle,
        datasets: [{
            label: 'My First dataset',
            borderColor: 'red',
            backgroundColor: 'red',
            fill: false,
            data: dates
            /*data: [{
               x: 3,
               y: 5
            }, {
               x: 5,
               y: 10
            }, {
               x: 8,
               y: 5
            }, {
               x: dataX[0],
               y: 10
            }],*/
         }]


        /*labels: ["First element", "Second element"],
        datasets: [{
            label: '# of Votes',
            data: [chartData[0], 10, 30],
            backgroundColor: [
                'rgba(44, 146, 213, 0)',
            ],
            borderColor: [
                'rgba(44, 146, 213, 1)',
            ],
            hoverBorderColor: [
                'rgba(41, 38, 38, 1)',
            ],
            borderWidth: 2
        }*//*,
        {
            label: '# of Votes',
            data: [chartData[1], 5],
            backgroundColor: [
                'rgba(44, 146, 213, 0)',
            ],
            borderColor: [
                'rgba(44, 146, 213, 1)',
            ],
            hoverBorderColor: [
                'rgba(41, 38, 38, 1)',
            ],
            borderWidth: 2
        }]*/
    },
    options: {
        responsive: true,
        scales: {
            xAxes: [{
                ticks: {
                    autoSkip: true,
                    maxTicksLimit: 24
                }
            }],
            /* xAxes: [{
                type: 'time',
                time: {
                  displayFormats: {'day': 'MM/YY'},
                  tooltipFormat: 'DD/MM/YY',
                  unit: 'month',
                 }
            }], */
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
let chartDataIdrox = document.getElementById("chart-data").dataset.chartidrox;
let chartDataGlico = document.getElementById("chart-data").dataset.chartglico;
let chartDataOssigeno = document.getElementById("chart-data").dataset.chartossigeno;

chartDataIdrox = JSON.parse(chartDataIdrox)
chartDataIdrox = Object.values(chartDataIdrox['nslDate'])

chartDataGlico = JSON.parse(chartDataGlico)
chartDataGlico = Object.values(chartDataGlico['nslDateGlico'])

chartDataOssigeno = JSON.parse(chartDataOssigeno)
chartDataOssigeno = Object.values(chartDataOssigeno['nslDateOssigeno'])

// Gennaio, Febbraio, Marzo, Aprile, Maggio, Giugno, Luglio, Agosto, Settembre, Ottobre, Novembre, Dicembre
const months = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11']
const months_restr = ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC']
const days_in_months = ['31', '29', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'];




/* IDROX X */
let dataXIdrox = [];
chartDataIdrox.forEach(el => {
    el = el + ''
    el = el.split(",")

    let tmp = el[0].split('-');
    // giorno mese - 20 || es. 15 Luglio - 20
    let month = months[months_restr.indexOf(tmp[1])];
    // let day = (tmp[0] < 10)? '0'+tmp[0] : tmp[0];
    dataXIdrox.push(`${tmp[0]}-${month}-${tmp[2]}20`);
})
dataXIdrox.splice(0, 1)
dataXIdrox = [... new Set(dataXIdrox)]

/* IDROX Y */
let dataYIdrox = []
for(i = 0; i < dataXIdrox.length; i++){
    dataYIdrox.push(0)
}
console.log(dataYIdrox.length + ' - ' + dataXIdrox.length)
dataXIdrox.forEach(dx => {
    chartDataIdrox.forEach(el => {
        el = el + ''
        el = el.split(",")
        let tmp = el[0].split('-')
        let month = months[months_restr.indexOf(tmp[1])];
        if(JSON.stringify(dx) === JSON.stringify(`${tmp[0]}-${month}-${tmp[2]}20`)){
            dataYIdrox[dataXIdrox.indexOf(dx)] += 1
        }
    })
})

// IDROX
var datesIdrox = [];
for(i=0; i < dataXIdrox.length; i++){
    let obj = {};
    obj.x = new Date(dataXIdrox[i].split('-')[2], dataXIdrox[i].split('-')[1], dataXIdrox[i].split('-')[0]);
    obj.y = dataYIdrox[i]
    datesIdrox.push(obj);
}





/* GLICO X */
let dataXGlico = [];
chartDataGlico.forEach(el => {
    el = el + ''
    el = el.split(",")

    let tmp = el[0].split('-');
    // giorno mese - 20 || es. 15 Luglio - 20
    let month = months[months_restr.indexOf(tmp[1])];
    // let day = (tmp[0] < 10)? '0'+tmp[0] : tmp[0];
    dataXGlico.push(`${tmp[0]}-${month}-${tmp[2]}20`);
})
dataXGlico.splice(0, 1)
dataXGlico = [... new Set(dataXGlico)]

/* GLICO Y */
let dataYGlico = []
for(i = 0; i < dataXGlico.length; i++){
    dataYGlico.push(0)
}
console.log(dataYGlico.length + ' - ' + dataXGlico.length)
dataXGlico.forEach(dx => {
    chartDataGlico.forEach(el => {
        el = el + ''
        el = el.split(",")
        let tmp = el[0].split('-')
        let month = months[months_restr.indexOf(tmp[1])];
        if(JSON.stringify(dx) === JSON.stringify(`${tmp[0]}-${month}-${tmp[2]}20`)){
            dataYGlico[dataXGlico.indexOf(dx)] += 1
        }
    })
})

// GLICO
var datesGlico = [];
for(i=0; i < dataXGlico.length; i++){
    let obj = {};
    obj.x = new Date(dataXGlico[i].split('-')[2], dataXGlico[i].split('-')[1], dataXGlico[i].split('-')[0]);
    obj.y = dataYGlico[i]
    datesGlico.push(obj);
}





/* OSSIGENO X */
let dataXOssigeno = [];
chartDataOssigeno.forEach(el => {
    el = el + ''
    el = el.split(",")

    let tmp = el[0].split('-');
    // giorno mese - 20 || es. 15 Luglio - 20
    let month = months[months_restr.indexOf(tmp[1])];
    // let day = (tmp[0] < 10)? '0'+tmp[0] : tmp[0];
    dataXOssigeno.push(`${tmp[0]}-${month}-${tmp[2]}20`);
})
dataXOssigeno.splice(0, 1)
dataXOssigeno = [... new Set(dataXOssigeno)]

/* OSSIGENO Y */
let dataYOssigeno = []
for(i = 0; i < dataXOssigeno.length; i++){
    dataYOssigeno.push(0)
}
console.log(dataYOssigeno.length + ' - ' + dataXOssigeno.length)
dataXOssigeno.forEach(dx => {
    chartDataOssigeno.forEach(el => {
        el = el + ''
        el = el.split(",")
        let tmp = el[0].split('-')
        let month = months[months_restr.indexOf(tmp[1])];
        if(JSON.stringify(dx) === JSON.stringify(`${tmp[0]}-${month}-${tmp[2]}20`)){
            dataYOssigeno[dataXOssigeno.indexOf(dx)] += 1
        }
    })
})

// OSSIGENO
var datesOssigeno = [];
for(i=0; i < dataXOssigeno.length; i++){
    let obj = {};
    obj.x = new Date(dataXOssigeno[i].split('-')[2], dataXOssigeno[i].split('-')[1], dataXOssigeno[i].split('-')[0]);
    obj.y = dataYOssigeno[i]
    datesOssigeno.push(obj);
}







const ctx = document.getElementById("chart").getContext("2d");
var dates2Idrox = datesIdrox.sort((a,b) => b.x - a.x);
var dates2Glico = datesGlico.sort((a,b) => b.x - a.x);
var dates2Ossigeno = datesOssigeno.sort((a,b) => b.x - a.x);
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
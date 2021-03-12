/* exports.getX = chartData => {
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

exports.getY = (dataX, chartData) => {
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

exports.getDates = (dataX, dataY) => {
    let dates = [];
    for (i = 0; i < dataX.length; i++) {
        let obj = {};
        obj.x = new Date(dataX[i].split('-')[2], dataX[i].split('-')[1], dataX[i].split('-')[0]);
        obj.y = dataY[i]
        dates.push(obj);
    }
    return dates;
} */
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

let tmpData = [{}];
var nslDateEparine = [{}];
db.serialize(() => {
    db.each("SELECT DataSomministrazione, Nosologico, Dosaggio " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.Codice = Prescrizioni.CodiceFarmaco " +
        "WHERE Farmaci.ATC4 LIKE 'eparin%' ORDER BY DataSomministrazione, Nosologico", (err, row) => {
            // nslDateEparine.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
            // nslDateEparine.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'] + ", " + row['prs_dos'].split(' ')[0]);
            let r = {};
            r.prs_date = row['DataSomministrazione'].split(' ')[0];
            r.prs_nsl_num = row['Nosologico'];
            r.prs_dos = row['Dosaggio'].split(' ')[0];

            tmpData.push(r);
        })
});
db.close();

exports.get_dates = () => {

    // console.log(tmpData.length);
    
    let i = 0;
    let sum = 0;
    while (i<tmpData.length) {
        sum += tmpData[i].prs_dos * 1;
        /* console.log(tmpData[i].prs_nsl_num + ' ' + sum + " AA") */

        if (tmpData[i+1] != undefined) {
            if (tmpData[i].prs_nsl_num != tmpData[i+1].prs_nsl_num) {
                if (sum >= 8000) {
                    nslDateEparine.push(tmpData[i].prs_date + "," + tmpData[i].prs_nsl_num);
                }

                sum = 0;
            }
            
        } else {
            if (sum >= 8000) {
                nslDateEparine.push(tmpData[i].prs_date + "," + tmpData[i].prs_nsl_num);
            }
            sum = 0;
        }
        i++;
    }

  
    /* tmpData.forEach(el => {
        if (el.prs_date != undefined && el.prs_nsl_num != undefined)
            nslDateEparine.push(el.prs_date + "," + el.prs_nsl_num);
    }) */



    return JSON.stringify({
        nslDateEparine
    });
};
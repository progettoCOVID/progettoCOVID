const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

let tmpData = [{}];
var nslDateEparine = [{}];
db.serialize(() => {
    db.each("SELECT prs_nsl_num, prs_date, prs_nsl_num, prs_dos " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id " +
        "WHERE Farmaci.frmc_atc4 LIKE 'eparin%'", (err, row) => {
            // nslDateEparine.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
            // nslDateEparine.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'] + ", " + row['prs_dos'].split(' ')[0]);
            let r = {};
            r.prs_date = row['prs_date'].split(' ')[0];
            r.prs_nsl_num = row['prs_nsl_num'];
            r.prs_dos = row['prs_dos'].split(' ')[0];

            tmpData.push(r);
        })
});
db.close();

exports.get_dates = () => {
    nslDateEparine.forEach(el => {
        console.log(el);
    })

    tmpData.forEach(el => {
        nslDateEparine.push(el.prs_date + ", " + el.prs_nsl_num + ", " + el.prs_dos);
    })


    return JSON.stringify({
        nslDateEparine
    });
};
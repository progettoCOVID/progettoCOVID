const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

var nslDateOssigeno = [{}];
db.serialize(() => {
    db.each("SELECT prs_date, prs_nsl_num " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id " +
        "WHERE Farmaci.frmc_atc5 LIKE '%ossigeno%'", (err, row) => {
            nslDateOssigeno.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
        })
});
db.close();

exports.get_dates = () => {
    return JSON.stringify({
        nslDateOssigeno
    });
};
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

var nslDateCardiopatici = [{}];
db.serialize(() => {
    db.each("SELECT prs_date, prs_nsl_num " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id " +
        "WHERE Farmaci.frmc_atc2 LIKE '%cardi%' OR Farmaci.frmc_atc2 LIKE '%ipertens%'", (err, row) => {
            nslDateCardiopatici.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
        })
});
db.close();

exports.get_dates = () => {
    return JSON.stringify({
        nslDateCardiopatici
    });
};
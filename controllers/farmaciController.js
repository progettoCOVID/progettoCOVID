/* const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

exports.get_dates = whereClause => {
    var nslDate = [{}];
    db.serialize(() => {
        db.each("SELECT prs_date, prs_nsl_num " +
            "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.frmc_num = Prescrizioni.prs_frmc_id " +
            `WHERE ${whereClause}`, (err, row) => {
                nslDate.push(row['prs_date'].split(' ')[0] + "," + row['prs_nsl_num'])
            })
    });
    db.close();


    return JSON.stringify({
        nslDate
    });
}; */
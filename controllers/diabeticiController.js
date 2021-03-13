const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

var nslDateDiabetici = [{}];
db.serialize(() => {
    db.each("SELECT DataSomministrazione, Nosologico " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.Codice = Prescrizioni.CodiceFarmaco " +
        "WHERE Farmaci.ATC2 LIKE '%diabete%' AND Farmaci.ATC3 LIKE '%ipoglicemizzanti%'", (err, row) => {
            nslDateDiabetici.push(row['DataSomministrazione'].split(' ')[0] + "," + row['Nosologico'])
        })
});
db.close();

exports.get_dates = () => {
    return JSON.stringify({
        nslDateDiabetici
    });
};
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

var nslDateCardiopatici = [{}];
db.serialize(() => {
    db.each("SELECT DataSomministrazione, Nosologico " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.Codice = Prescrizioni.CodiceFarmaco " +
        "WHERE Farmaci.ATC2 LIKE '%cardi%' OR Farmaci.ATC2 LIKE '%ipertens%' OR Farmaci.ATC2 LIKE '%betabloccanti%' OR Farmaci.ATC2 LIKE '%calcio-antagonisti%'", (err, row) => {
            nslDateCardiopatici.push(row['DataSomministrazione'].split(' ')[0] + "," + row['Nosologico'])
        })
});
db.close();

exports.get_dates = () => {
    return JSON.stringify({
        nslDateCardiopatici
    });
};
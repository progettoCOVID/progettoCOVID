const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

var nslDateAntibiotici = [{}];
db.serialize(() => {
    db.each("SELECT DataSomministrazione, Nosologico " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.Codice = Prescrizioni.CodiceFarmaco " +
        "WHERE Farmaci.ATC5 LIKE 'Ertapenem' OR Farmaci.ATC5 LIKE 'Ceftriaxone'", (err, row) => {
            nslDateAntibiotici.push(row['DataSomministrazione'].split(' ')[0] + "," + row['Nosologico'])
        })
});
db.close();

exports.get_dates = () => {
    return JSON.stringify({
        nslDateAntibiotici
    });
};
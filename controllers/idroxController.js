const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

var nslDateIdrox = [{}];
db.serialize(() => {
    db.each(
        'SELECT DataSomministrazione, Nosologico ' +
        'FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.Codice = Prescrizioni.CodiceFarmaco ' +
        "WHERE Farmaci.ATC5 = 'IDROXICLOROCHINA'",
        (err, row) => {
            nslDateIdrox.push(row['DataSomministrazione'].split(' ')[0] + ',' + row['Nosologico']);
        }
    );
});
db.close();

exports.get_dates = () => {
    return JSON.stringify({
        nslDateIdrox
    });
};
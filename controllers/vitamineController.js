const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/tabella.db');

var nslDateVitamine = [{}];

// TO DO => testare accuratamente la nuova query (c'e' ancora discordanza !!)
db.serialize(() => {
    db.each(
        /* "SELECT DataSomministrazione, Nosologico " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.Codice = Prescrizioni.CodiceFarmaco " +
        "WHERE Farmaci.ATC3 LIKE 'Polivitaminici%' OR Farmaci.ATC3 LIKE 'Vitamine a e d%' OR Farmaci.ATC3 LIKE 'Acido asco%'", */
        "SELECT DataSomministrazione, Nosologico " +
        "FROM Prescrizioni INNER JOIN Farmaci ON Farmaci.Codice = Prescrizioni.CodiceFarmaco " +
        "WHERE Farmaci.ATC3 LIKE '%vit%'",
        (err, row) => {
            nslDateVitamine.push(row['DataSomministrazione'].split(' ')[0] + ',' + row['Nosologico']);
        }
    );
});
db.close();

exports.get_dates = () => {
    return JSON.stringify({
        nslDateVitamine
    });
};
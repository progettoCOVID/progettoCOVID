SELECT Nosologico from Prescrizioni INNER JOIN Farmaci
	ON Farmaci.Codice = Prescrizioni.CodiceFarmaco
	WHERE Farmaci.ATC5 LIKE "%ossigeno%"
	GROUP BY Prescrizioni.Nosologico
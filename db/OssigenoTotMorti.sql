SELECT Prescrizioni.Nosologico from Prescrizioni 
	INNER JOIN Farmaci ON Farmaci.Codice = Prescrizioni.CodiceFarmaco
	INNER JOIN NosologicoComplicanze ON NosologicoComplicanze.Nosologico = Prescrizioni.Nosologico
	WHERE Farmaci.ATC5 LIKE "%ossigeno%"
	AND NosologicoComplicanze.Decesso = "S"
	GROUP BY Prescrizioni.Nosologico
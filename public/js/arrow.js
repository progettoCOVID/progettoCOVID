let btn = document.getElementById("arrowBtn");
btn.addEventListener("click", showDiv);
document.getElementById("info").style.display = "none";

// Gesione mouse
document.addEventListener('mouseup', function (e) {
    let container = document.getElementById('card');
    if (!container.contains(e.target)) {
        document.getElementById("info").style.display = "none";
    }
});

// Gestione bottone
function showDiv() {
    if (document.getElementById("info").style.display === "none") {
        document.getElementById("info").style.display = "block";
        document.getElementById("iconTitle").title = "Chiudi Scheda";
    } else {
        document.getElementById("info").style.display = "none";
        document.getElementById("iconTitle").title = "Maggiori informazioni";
    }
}


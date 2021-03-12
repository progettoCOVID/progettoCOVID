let chartData = document.getElementById("chart-data").dataset.chartdata;
chartData = Array.from(chartData.split(","));
console.log(typeof chartData, chartData);

const ctx = document.getElementById("chart").getContext("2d");
const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["First element", "Second element"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19],
            backgroundColor: [
                'rgba(44, 146, 213, 0)',
            ],
            borderColor: [
                'rgba(44, 146, 213, 1)',
            ],
            hoverBorderColor: [
                'rgba(41, 38, 38, 1)',
            ],
            borderWidth: 2
        },
        {
            label: '# of Votes',
            data: [19, 32],
            backgroundColor: [
                'rgba(44, 146, 213, 0)',
            ],
            borderColor: [
                'rgba(44, 146, 213, 1)',
            ],
            hoverBorderColor: [
                'rgba(41, 38, 38, 1)',
            ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
// Loads population and timeline data, renders the chart and timeline list.

async function loadJSON(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}: ${response.status}`);
  }
  return response.json();
}

function renderPopulationChart(data) {
  const ctx = document.getElementById("populationChart");
  const labels = data.map((d) => d.year);

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Total Population (millions)",
          data: data.map((d) => d.totalPopulationMillions),
          borderColor: "#8a1f2b",
          backgroundColor: "rgba(138, 31, 43, 0.15)",
          yAxisID: "y",
          tension: 0.25,
          fill: true,
        },
        {
          label: "Foreign-Born Share (%)",
          data: data.map((d) => d.foreignBornPercent),
          borderColor: "#c98a2c",
          backgroundColor: "rgba(201, 138, 44, 0.15)",
          yAxisID: "y1",
          tension: 0.25,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: { mode: "index", intersect: false },
      scales: {
        y: {
          type: "linear",
          position: "left",
          title: { display: true, text: "Population (millions)" },
        },
        y1: {
          type: "linear",
          position: "right",
          title: { display: true, text: "Foreign-born (%)" },
          grid: { drawOnChartArea: false },
        },
      },
    },
  });
}

function renderTimeline(events) {
  const container = document.getElementById("timeline-list");
  container.innerHTML = "";

  events
    .slice()
    .sort((a, b) => parseInt(a.year, 10) - parseInt(b.year, 10))
    .forEach((event) => {
      const item = document.createElement("article");
      item.className = "timeline-item";

      const detailsList = event.details
        .map((d) => `<li>${d}</li>`)
        .join("");

      item.innerHTML = `
        <span class="year">${event.year}</span>
        <h3>${event.title}</h3>
        <p class="summary">${event.summary}</p>
        <details>
          <summary>Read more</summary>
          <ul>${detailsList}</ul>
        </details>
        <a class="source" href="${event.source}" target="_blank" rel="noopener noreferrer">Source</a>
      `;

      container.appendChild(item);
    });
}

async function init() {
  try {
    const [population, timeline] = await Promise.all([
      loadJSON("data/population.json"),
      loadJSON("data/timeline.json"),
    ]);
    renderPopulationChart(population);
    renderTimeline(timeline);
  } catch (err) {
    const container = document.getElementById("timeline-list");
    if (container) {
      container.innerHTML = `<p class="error">Could not load data: ${err.message}</p>`;
    }
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", init);

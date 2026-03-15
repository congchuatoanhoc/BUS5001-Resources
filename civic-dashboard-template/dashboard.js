
async function loadDashboard() {

  try {

    const response = await fetch("./data/summary.json");
    const data = await response.json();

    document.getElementById("lastUpdated").textContent =
      data.lastUpdated;

    document.getElementById("totalIncidents").textContent =
      data.metrics.totalIncidents;

    document.getElementById("openIncidents").textContent =
      data.metrics.openIncidents;

    document.getElementById("resolvedIncidents").textContent =
      data.metrics.resolvedIncidents;

    const labels = data.byCategory.map(x => x.category);
    const values = data.byCategory.map(x => x.count);

    new Chart(document.getElementById("categoryChart"), {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Incidents by Category",
          data: values
        }]
      }
    });

    const table = document.getElementById("recordsTable");
    table.innerHTML = "";

    data.recentRecords.forEach(r => {

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${r.incident_id}</td>
        <td>${r.reported_date}</td>
        <td>${r.suburb}</td>
        <td>${r.category}</td>
        <td>${r.status}</td>
        <td>${r.priority}</td>
      `;

      table.appendChild(row);

    });

  }
  catch (error) {

    console.error(error);

    document.getElementById("recordsTable").innerHTML =
      "<tr><td colspan='6'>Error loading data</td></tr>";

  }

}

loadDashboard();

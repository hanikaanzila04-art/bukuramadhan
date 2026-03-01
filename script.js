const container = document.getElementById("ramadhanDays");

function loadData() {
    return JSON.parse(localStorage.getItem("ramadhanData")) || {};
}

function saveData(data) {
    localStorage.setItem("ramadhanData", JSON.stringify(data));
}

function updateProgress() {
    const data = loadData();
    let total = 30;
    let completed = 0;

    for (let day = 1; day <= 30; day++) {
        if (data[day] && data[day].puasa) {
            completed++;
        }
    }

    let percent = Math.round((completed / total) * 100);
    document.getElementById("progress").style.width = percent + "%";
    document.getElementById("progressText").innerText = percent + "%";
}

function createDays() {
    const data = loadData();

    for (let day = 1; day <= 30; day++) {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>Hari ${day}</h3>
            <label>
                <input type="checkbox" ${data[day]?.puasa ? "checked" : ""} 
                onchange="togglePuasa(${day}, this.checked)">
                Puasa
            </label><br><br>

            <strong>Sholat 5 Waktu:</strong><br>
            ${["Subuh","Dzuhur","Ashar","Maghrib","Isya"].map(sholat => `
                <label>
                    <input type="checkbox" 
                    ${data[day]?.[sholat] ? "checked" : ""} 
                    onchange="toggleSholat(${day}, '${sholat}', this.checked)">
                    ${sholat}
                </label><br>
            `).join("")}
            <br>

            <label>Tilawah (Jumlah Halaman):</label>
            <input type="number" min="0" value="${data[day]?.tilawah || 0}" 
            onchange="setTilawah(${day}, this.value)">
            <br><br>

            <label>Catatan Harian:</label>
            <textarea rows="2" 
            onchange="setCatatan(${day}, this.value)">${data[day]?.catatan || ""}</textarea>
        `;

        container.appendChild(card);
    }

    updateProgress();
}

function togglePuasa(day, value) {
    let data = loadData();
    if (!data[day]) data[day] = {};
    data[day].puasa = value;
    saveData(data);
    updateProgress();
}

function toggleSholat(day, sholat, value) {
    let data = loadData();
    if (!data[day]) data[day] = {};
    data[day][sholat] = value;
    saveData(data);
}

function setTilawah(day, value) {
    let data = loadData();
    if (!data[day]) data[day] = {};
    data[day].tilawah = value;
    saveData(data);
}

function setCatatan(day, value) {
    let data = loadData();
    if (!data[day]) data[day] = {};
    data[day].catatan = value;
    saveData(data);
}

createDays();
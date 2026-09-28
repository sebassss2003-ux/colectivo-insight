let map;
let routeMarker;
let telemetryIndex = 0;

const telemetryData = [
    {
        speed: "18 km/h",
        status: "En ruta",
        position: "Punto piloto 01"
    },
    {
        speed: "12 km/h",
        status: "Retraso inusual",
        position: "Punto piloto 02"
    },
    {
        speed: "8 km/h",
        status: "Zona de observación",
        position: "Punto piloto 03"
    },
    {
        speed: "21 km/h",
        status: "En ruta",
        position: "Punto piloto 04"
    }
];


/* =========================
   REPORTING
========================= */

function submitReport() {

    const type = document.getElementById("reportType").value;
    const location = document.getElementById("location").value.trim();
    const description = document.getElementById("description").value.trim();
    const expiration = document.getElementById("expiration").value;

    if (!location || !description) {
        alert("Por favor completa la ubicación y la descripción.");
        return;
    }

    if (location.length > 100) {
        alert("La ubicación es demasiado larga.");
        return;
    }

    if (description.length < 10) {
        alert("La descripción debe tener al menos 10 caracteres.");
        return;
    }

    if (description.length > 300) {
        alert("La descripción no puede superar los 300 caracteres.");
        return;
    }

    const aiResult = simulatedAI(type, description);

    const report = {
        type: type,
        location: location,
        description: description,
        expiration: expiration,
        status: "En revisión",
        aiLabel: "IA SIMULADA",
        aiConfidence: aiResult.confidence,
        recommendation: "Revisión humana requerida.",
        createdAt: new Date().toLocaleString("es-MX")
    };

    localStorage.setItem(
        "colectivoInsightReport",
        JSON.stringify(report)
    );

    showReport(report);

    document.getElementById("location").value = "";
    document.getElementById("description").value = "";

    alert("Reporte enviado correctamente.");
}


function simulatedAI(type, description) {

    const text = description.toLowerCase();

    let confidence = "Media";

    if (
        text.includes("cerrada") ||
        text.includes("accidente") ||
        text.includes("peligrosa") ||
        text.includes("bloqueo") ||
        text.includes("obras")
    ) {
        confidence = "Alta";
    }

    if (text.length < 20) {
        confidence = "Baja";
    }

    return {
        confidence: confidence
    };
}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


function showReport(report) {

    const container = document.getElementById("reportStatus");

    if (!container) {
        return;
    }

    container.style.display = "block";

    container.innerHTML = `
        <div class="saved-header">

            <div>

                <span class="status-badge">
                    EN REVISIÓN
                </span>

                <h3>
                    ${escapeHTML(report.type)}
                </h3>

            </div>

            <span class="saved-device">
                ✓ REPORTE GUARDADO EN ESTE DISPOSITIVO
            </span>

        </div>

        <div class="saved-grid">

            <div>
                <strong>Ubicación</strong>
                <p>${escapeHTML(report.location)}</p>
            </div>

            <div>
                <strong>Descripción</strong>
                <p>${escapeHTML(report.description)}</p>
            </div>

            <div>
                <strong>IA</strong>
                <p>${escapeHTML(report.aiLabel)}</p>
            </div>

            <div>
                <strong>Confianza simulada</strong>
                <p>${escapeHTML(report.aiConfidence)}</p>
            </div>

            <div>
                <strong>Recomendación</strong>
                <p>${escapeHTML(report.recommendation)}</p>
            </div>

            <div>
                <strong>Expiración</strong>
                <p>${escapeHTML(report.expiration)}</p>
            </div>

        </div>

        <small>
            Creado: ${escapeHTML(report.createdAt)}
        </small>
    `;
}


function loadSavedReport() {

    const savedReport = localStorage.getItem(
        "colectivoInsightReport"
    );

    if (savedReport) {

        try {

            const report = JSON.parse(savedReport);

            showReport(report);

        } catch (error) {

            localStorage.removeItem(
                "colectivoInsightReport"
            );
        }
    }
}


function clearReport() {

    localStorage.removeItem(
        "colectivoInsightReport"
    );

    const container =
        document.getElementById("reportStatus");

    if (container) {

        container.style.display = "none";
        container.innerHTML = "";
    }

    alert(
        "Reporte de demostración eliminado de este dispositivo."
    );
}


/* =========================
   LEAFLET MAP
========================= */

function initializeMap() {

    const mapElement = document.getElementById("map");

    if (!mapElement || typeof L === "undefined") {
        return;
    }

    map = L.map("map").setView(
        [19.3950, -99.1400],
        11
    );

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution:
                '&copy; OpenStreetMap contributors'
        }
    ).addTo(map);


    const routeCoordinates = [
        [19.5000, -99.1200],
        [19.4700, -99.1300],
        [19.4400, -99.1350],
        [19.4100, -99.1400],
        [19.3800, -99.1500],
        [19.3500, -99.1600]
    ];


    const route = L.polyline(
        routeCoordinates,
        {
            color: "#4f7560",
            weight: 5,
            opacity: 0.85
        }
    ).addTo(map);


    routeMarker = L.marker(
        routeCoordinates[0]
    ).addTo(map);


    routeMarker.bindPopup(
        "<strong>Ruta 1</strong><br>" +
        "Telemetría simulada"
    );


    L.circleMarker(
        routeCoordinates[0],
        {
            radius: 8,
            color: "#1d2421",
            fillColor: "#ffffff",
            fillOpacity: 1,
            weight: 3
        }
    )
    .addTo(map)
    .bindPopup(
        "<strong>Metro Indios Verdes</strong><br>" +
        "Inicio de la ruta"
    );


    L.circleMarker(
        routeCoordinates[5],
        {
            radius: 8,
            color: "#1d2421",
            fillColor: "#ffffff",
            fillOpacity: 1,
            weight: 3
        }
    )
    .addTo(map)
    .bindPopup(
        "<strong>Metro Universidad</strong><br>" +
        "Fin de la ruta"
    );


    L.marker(
        [19.4100, -99.1400]
    )
    .addTo(map)
    .bindPopup(
        "<strong>Alerta piloto</strong><br>" +
        "Excepción operativa simulada"
    );


    map.fitBounds(route.getBounds(), {
        padding: [20, 20]
    });
}


/* =========================
   SIMULATED TELEMETRY
========================= */

function simulateTelemetry() {

    telemetryIndex++;

    if (telemetryIndex >= telemetryData.length) {
        telemetryIndex = 0;
    }

    const data =
        telemetryData[telemetryIndex];

    const speed =
        document.getElementById("speedValue");

    const status =
        document.getElementById("telemetryStatus");

    const position =
        document.getElementById("positionValue");

    if (speed) {
        speed.textContent = data.speed;
    }

    if (status) {
        status.textContent = data.status;
    }

    if (position) {
        position.textContent = data.position;
    }


    if (routeMarker && map) {

        const simulatedPositions = [
            [19.5000, -99.1200],
            [19.4700, -99.1300],
            [19.4100, -99.1400],
            [19.3500, -99.1600]
        ];

        routeMarker.setLatLng(
            simulatedPositions[telemetryIndex]
        );

        routeMarker.bindPopup(
            "<strong>Telemetría SIMULADA</strong><br>" +
            data.speed +
            "<br>" +
            data.status
        );
    }
}


/* =========================
   DEMO BUTTONS
========================= */

function loginDemo() {

    alert(
        "Demo: el acceso de usuario estará disponible en una siguiente versión."
    );
}


function registerDemo() {

    alert(
        "Demo: el registro de usuarios estará disponible en una siguiente versión."
    );
}


/* =========================
   START APP
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadSavedReport();

        initializeMap();

    }
);

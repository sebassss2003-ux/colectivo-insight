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

    localStorage.setItem("colectivoInsightReport", JSON.stringify(report));

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
                <span class="status-badge">EN REVISIÓN</span>
                <h3>${escapeHTML(report.type)}</h3>
            </div>
            <span class="saved-device">✓ REPORTE GUARDADO EN ESTE DISPOSITIVO</span>
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

        <small>Creado: ${escapeHTML(report.createdAt)}</small>
    `;
}


function loadSavedReport() {
    const savedReport = localStorage.getItem("colectivoInsightReport");

    if (savedReport) {
        try {
            const report = JSON.parse(savedReport);
            showReport(report);
        } catch (error) {
            localStorage.removeItem("colectivoInsightReport");
        }
    }
}


function clearReport() {
    localStorage.removeItem("colectivoInsightReport");

    const container = document.getElementById("reportStatus");

    if (container) {
        container.style.display = "none";
        container.innerHTML = "";
    }

    alert("Reporte de demostración eliminado de este dispositivo.");
}


function loginDemo() {
    alert("Demo: el acceso de usuario estará disponible en una siguiente versión.");
}


function registerDemo() {
    alert("Demo: el registro de usuarios estará disponible en una siguiente versión.");
}


document.addEventListener("DOMContentLoaded", function () {
    loadSavedReport();
});

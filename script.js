// ==========================================
// COLECTIVO INSIGHT
// WEEK 7 - BUSINESS BENDING
// ==========================================


// ==========================================
// SEND REPORT
// ==========================================

function submitReport() {

    const type =
        document.getElementById("reportType").value;

    const location =
        document.getElementById("location").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const expiration =
        document.getElementById("expiration").value;


    // BASIC VALIDATION

    if (!location || !description) {

        alert(
            "Agrega una ubicación y una descripción antes de enviar el reporte."
        );

        return;
    }


    if (description.length < 10) {

        alert(
            "La descripción debe tener al menos 10 caracteres."
        );

        return;
    }


    // SIMULATED AI CLASSIFICATION

    const aiResult =
        simulatedAI(type, description);


    // REPORT OBJECT

    const report = {

        type: type,

        location: location,

        description: description,

        expiration: expiration,

        status: "En revisión",

        ai: aiResult,

        createdAt:
            new Date().toLocaleString("es-MX")

    };


    // SAVE DEMO REPORT

    localStorage.setItem(
        "colectivoInsightReport",
        JSON.stringify(report)
    );


    // SHOW REPORT ON SCREEN

    showReport(report);


    // CLEAR FORM

    document.getElementById("location").value = "";

    document.getElementById("description").value = "";


    // CONFIRMATION

    alert(
        "Reporte recibido.\n\n" +
        "Estado: EN REVISIÓN\n" +
        "La información será revisada antes de mostrarse como verificada."
    );

}


// ==========================================
// DISPLAY REPORT
// ==========================================

function showReport(report) {

    const container =
        document.getElementById("reportStatus");

    const content =
        document.getElementById("statusContent");


    container.style.display = "block";


    content.innerHTML = `

        <strong>
            ${report.type}
        </strong>

        <br><br>

        📍 ${report.location}

        <br><br>

        ${report.description}

        <br><br>

        <strong>
            Estado:
        </strong>

        <span style="
            color:#176fe8;
            font-weight:bold;
        ">
            EN REVISIÓN
        </span>

        <br><br>

        🤖 <strong>IA SIMULADA</strong>

        <br>

        Clasificación:
        ${report.ai.confidence}

        <br>

        Recomendación:
        ${report.ai.recommendation}

        <br><br>

        ⏳ Vigencia:
        ${report.expiration}

        <br><br>

        <small>
            Creado:
            ${report.createdAt}
        </small>

    `;
}


// ==========================================
// SIMULATED AI
// ==========================================

function simulatedAI(type, description) {

    const keywords = [

        "cerrada",
        "cierre",
        "accidente",
        "peligro",
        "tráfico",
        "trafico",
        "desvío",
        "desvio",
        "obra"

    ];


    const text =
        description.toLowerCase();


    const relevant =
        keywords.some(
            keyword =>
                text.includes(keyword)
        );


    return {

        label: "IA SIMULADA",

        confidence:
            relevant
                ? "Media"
                : "Baja",

        recommendation:
            "Revisión humana requerida."

    };

}


// ==========================================
// LOAD LAST REPORT
// ==========================================

function loadSavedReport() {

    const saved =
        localStorage.getItem(
            "colectivoInsightReport"
        );


    if (!saved) {
        return;
    }


    try {

        const report =
            JSON.parse(saved);

        showReport(report);

    }

    catch (error) {

        console.log(
            "No se pudo cargar el reporte guardado."
        );

    }

}


// ==========================================
// HEADER DEMO BUTTONS
// ==========================================

document
    .querySelector(".login")
    .addEventListener(
        "click",
        function () {

            alert(
                "Demo: el inicio de sesión estará disponible en una siguiente versión."
            );

        }
    );


document
    .querySelector(".register")
    .addEventListener(
        "click",
        function () {

            alert(
                "Demo: el registro estará disponible en una siguiente versión."
            );

        }
    );


// ==========================================
// START
// ==========================================

loadSavedReport();

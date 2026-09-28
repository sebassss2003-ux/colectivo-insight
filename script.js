// =====================================
// COLECTIVO INSIGHT
// WEEK 7 - BUSINESS BENDING
// =====================================


// -------------------------------------
// REPORT SUBMISSION
// -------------------------------------

function submitReport() {

    const type =
        document.getElementById("reportType").value;

    const location =
        document.getElementById("location").value.trim();

    const description =
        document.getElementById("description").value.trim();

    const expiration =
        document.getElementById("expiration").value;


    // VALIDATION

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


    // SIMULATED AI TRIAGE

    const aiResult =
        simulatedAI(type, description);


    // CREATE REPORT

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


    // SAVE DEMO DATA

    localStorage.setItem(
        "colectivoInsightReport",
        JSON.stringify(report)
    );


    // USER FEEDBACK

    alert(
        "Reporte recibido correctamente.\n\n" +
        "Estado: EN REVISIÓN\n" +
        "Tipo: " + type + "\n" +
        "Ubicación: " + location + "\n" +
        "Vigencia: " + expiration
    );


    // CLEAR FORM

    document.getElementById("location").value = "";

    document.getElementById("description").value = "";

}


// -------------------------------------
// SIMULATED AI
// -------------------------------------
// This is intentionally a simulated output.
// It does NOT make autonomous safety decisions.

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
            keyword => text.includes(keyword)
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


// -------------------------------------
// NAVIGATION BUTTONS
// -------------------------------------

document
    .querySelector(".login")
    .addEventListener("click", function () {

        alert(
            "Demo: el inicio de sesión estará disponible en una siguiente versión."
        );

    });


document
    .querySelector(".register")
    .addEventListener("click", function () {

        alert(
            "Demo: el registro estará disponible en una siguiente versión."
        );

    });

function getCurrentDate() {
    return new Date().toLocaleDateString("en-GB");
}

function formatList(text) {
    if (!text.trim()) return "- None";
    return text.split('\n').map(i => "- " + i.trim()).join('\n');
}

function generateStatus() {
    const name = document.getElementById("name").value;
    const project = document.getElementById("project").value;
    const statusType = document.getElementById("statusType").value;
    const completed = formatList(document.getElementById("completed").value);
    const progress = formatList(document.getElementById("progress").value);
    const blockers = formatList(document.getElementById("blockers").value);
    const date = getCurrentDate();

    const statusText = `
${statusType}
Date: ${date}

Employee: ${name}
Project: ${project}

Completed:
${completed}

In Progress:
${progress}

Blockers:
${blockers}
    `;

    document.getElementById("output").innerText = statusText.trim();
}

function copyStatus() {
    navigator.clipboard.writeText(document.getElementById("output").innerText);
    alert("Copied to clipboard");
}

function downloadStatus() {
    const text = document.getElementById("output").innerText;
    const blob = new Blob([text], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Status_Report.txt";
    link.click();
}

/* 📧 EMAIL FUNCTION */
function sendEmail() {
    const output = document.getElementById("output").innerText;
    const toEmail = document.getElementById("toEmail").value;

    if (!output || !toEmail) {
        alert("Generate status and enter email");
        return;
    }

    emailjs.send("service_idd744k", "template_po7qphq", {
        employee_name: document.getElementById("name").value,
        project_name: document.getElementById("project").value,
        status_type: document.getElementById("statusType").value,
        date: getCurrentDate(),
        status_content: output,
        to_email: toEmail
    })
    .then(() => alert("Email sent successfully!"))
    .catch(() => alert("Failed to send email"));
}
// ==========================
// 🧾 WORK EXPERIENCE SECTION
// ==========================
function addWork() {
  const jobTitle = document.getElementById("jobTitle").value.trim();
  const joinDate = document.getElementById("joinDate").value.trim();
  const leaveDate = document.getElementById("leaveDate").value.trim();

  if (!jobTitle || !joinDate || !leaveDate) {
    alert("Please fill up all fields before adding!");
    return;
  }

  const tbody = document.querySelector("#workTable tbody");
  const newRow = tbody.insertRow();
  newRow.innerHTML = `<td>${jobTitle}</td><td>${joinDate}</td><td>${leaveDate}</td>`;

  // Clear inputs
  document.getElementById("jobTitle").value = "";
  document.getElementById("joinDate").value = "";
  document.getElementById("leaveDate").value = "";
}


// ==========================
// 🎓 EDUCATION SECTION
// ==========================
function addEducation() {
  const degree = document.getElementById("degreeSelect").value;
  const institute = document.getElementById("instituteInput").value.trim();
  const subject = document.getElementById("subjectInput").value.trim();
  const year = document.getElementById("yearInput").value.trim();
  const gpa = document.getElementById("gpaInput").value.trim();
  const scale = document.getElementById("scaleSelect").value;

  if (!degree || !institute || !subject || !year || !gpa || !scale) {
    alert("Please fill all fields!");
    return;
  }

  const tbody = document.querySelector("#eduTable tbody");
  const newRow = tbody.insertRow();
  newRow.innerHTML = `
    <td>${degree}</td>
    <td>${institute}</td>
    <td>${subject}</td>
    <td>${year}</td>
    <td>${gpa} out of ${scale}</td>
  `;

  // Clear inputs after adding
  document.getElementById("instituteInput").value = "";
  document.getElementById("subjectInput").value = "";
  document.getElementById("yearInput").value = "";
  document.getElementById("gpaInput").value = "";
}


// ==========================
// 💡 ADDITIONAL FIELDS
// ==========================
function addAcademicQualification() {
  let newNode = document.createElement('textarea');
  newNode.classList.add('form-control', 'eqField', 'mt-2');
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("placeholder", "Enter here");
  let eqOb = document.getElementById("eq");
  let eqAddbuttonOb = document.getElementById("eqAddButton");
  eqOb.insertBefore(newNode, eqAddbuttonOb);
}

function addSkills() {
  let newNode = document.createElement('textarea');
  newNode.classList.add('form-control', 'skillsField', 'mt-2');
  newNode.setAttribute("rows", 3);
  newNode.setAttribute("placeholder", "Enter here");
  let sOb = document.getElementById("s");
  let sAddbuttonOb = document.getElementById("sAddButton");
  sOb.insertBefore(newNode, sAddbuttonOb);
}


// ==========================
// 🧠 GENERATE RESUME
// ==========================
function generateResume() {
  // Personal Info
  const fullName = document.getElementById("fullName").value;
  document.getElementById("nameT").innerHTML = fullName;
  document.getElementById("nameT2").innerHTML = fullName;

  document.getElementById("contactT").innerHTML = document.getElementById("phoneNumber").value;
  document.getElementById("emailT").innerHTML = document.getElementById("emailAddress").value;
  document.getElementById("addressT").innerHTML = document.getElementById("contactField").value;

  // Social Links
  document.getElementById("fbT").innerHTML = document.getElementById("fbField").value;
  document.getElementById("fbT").href = document.getElementById("fbField").value;

  document.getElementById("linkedinT").innerHTML = document.getElementById("linkedinField").value;
  document.getElementById("linkedinT").href = document.getElementById("linkedinField").value;

  document.getElementById("instaT").innerHTML = document.getElementById("InstagramField").value;
  document.getElementById("instaT").href = document.getElementById("InstagramField").value;

  // Objective
  document.getElementById("objectiveT").innerHTML = document.getElementById("Objective").value;

  // =====================
  // WORK EXPERIENCE TABLE
  // =====================
  const workRows = document.querySelectorAll("#workTable tbody tr");
  let workStr = `
    <table class='table table-bordered text-center'>
      <thead class='table-primary'>
        <tr>
          <th>Job Title</th>
          <th>Joining</th>
          <th>Leaving</th>
        </tr>
      </thead>
      <tbody>
  `;
  workRows.forEach(row => {
    let cols = row.querySelectorAll("td");
    workStr += `
      <tr>
        <td>${cols[0].innerText}</td>
        <td>${cols[1].innerText}</td>
        <td>${cols[2].innerText}</td>
      </tr>
    `;
  });
  workStr += "</tbody></table>";
  document.getElementById("workTemplate").innerHTML = workStr;

  // =====================
  // EDUCATION TABLE COPY
  // =====================
  const eduTableBody = document.querySelector("#eduTable tbody");
  const eduTemplateBody = document.querySelector("#eduTableTemplate tbody");
  eduTemplateBody.innerHTML = eduTableBody.innerHTML;

  // =====================
  // SKILLS
  // =====================
  let skills = document.getElementsByClassName("skillsField");
  let skillsStr = "";
  for (let e of skills) {
    if (e.value.trim() !== "") skillsStr += `<li>${e.value}</li>`;
  }
  document.getElementById("sT").innerHTML = skillsStr;

  // =====================
  // PHOTO
  // =====================
  let file = document.getElementById("imgField").files[0];
  if (file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      document.getElementById("imgT").src = reader.result;
    };
  }

  // =====================
  // SHOW TEMPLATE
  // =====================
  document.getElementById("cv-form").style.display = "none";
  document.getElementById("cv-template").style.display = "block";
}


// ==========================
// 📄 DOWNLOAD CV AS PRINT
// ==========================
function downloadCV() {
  const cvElement = document.getElementById("cv-template");

  const downloadBtn = cvElement.querySelector("button");
  if (downloadBtn) downloadBtn.style.display = "none";

  const printWindow = window.open('', '', 'height=800,width=1000');
  printWindow.document.write('<html><head><title>CV Preview</title>');
  printWindow.document.write(`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
      <link rel="stylesheet" href="style.css">
      <style>
          @media print {
              button { display: none !important; }
              body { background: white !important; }
          }
      </style>
  `);
  printWindow.document.write('</head><body>');
  printWindow.document.write(cvElement.outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();

  printWindow.onload = function () {
    printWindow.focus();
    printWindow.print();
  };

  if (downloadBtn) downloadBtn.style.display = "block";
}

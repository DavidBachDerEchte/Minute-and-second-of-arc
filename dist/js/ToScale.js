const circle = document.getElementById("circle");
const stricheInput = document.getElementById("striche");
const kreisGroesseInput = document.getElementById("kreisGroesse");
const whatIsItId = document.getElementById("whatIsItId");

function updateCircle() {
  const numberOfLines = parseInt(stricheInput.value);
  const circleRadius = parseInt(kreisGroesseInput.value);

  circle.style.width = `${circleRadius}cm`;
  circle.style.height = `${circleRadius}cm`;

  // Lösche vorhandene Linien
  while (circle.firstChild) {
    circle.removeChild(circle.firstChild);
  }

  if (whatIsItId.hasChildNodes()) {
    whatIsItId.removeChild(whatIsItId.firstChild);
  }

  if (whereIsItId.hasChildNodes()) {
    whereIsItId.removeChild(whereIsItId.firstChild);
  }

  const whatIsIt = document.createElement("h2");

  const epsilon = 100; // Eine kleine Toleranz für Gleitkommazahlen

  if (numberOfLines >= 4665600000 - epsilon) {
    whatIsIt.innerText = "Every gap is 1 Micro-arc-sekunde big";
    whatIsItId.appendChild(whatIsIt);
  } else if (numberOfLines >= 77760000 - epsilon) {
    whatIsIt.innerText = "Every gap is 1 Milli-arc-sekunde big";
    whatIsItId.appendChild(whatIsIt);
  } else if (numberOfLines >= 1296000 - epsilon) {
    whatIsIt.innerText = "Every gap is 1 Arc-sekunde big";
    whatIsItId.appendChild(whatIsIt);
  } else if (numberOfLines >= 21600 - epsilon) {
    whatIsIt.innerText = "Every gap is 1 Arc-minute big";
    whatIsItId.appendChild(whatIsIt);
  } else if (numberOfLines >= 360 - epsilon) {
    whatIsIt.innerText = "Every gap is 1°";
    whatIsItId.appendChild(whatIsIt);
  } else {
    whatIsIt.innerText = "Minute and second of arc: ";
    whatIsItId.appendChild(whatIsIt);
  }

  const whereIsIt = document.createElement("h3");
  whereIsIt.innerText = `You are at Value: ${numberOfLines}`;
  whereIsItId.appendChild(whereIsIt);

  const lineThickness = 1; // Setze die gewünschte Dicke der Linien in Pixel

  for (let i = 0; i < numberOfLines; i++) {
    const line = document.createElement("div");
    line.classList.add("line");

    // Setze die Breite und Höhe der Linien
    line.style.width = `${circleRadius / 2}cm`;
    line.style.height = `${lineThickness}px`;

    const angle = (360 / numberOfLines) * i;

    const newRadius = circleRadius;

    // Berechne die Position der Linien am Rand des Kreises
    const x = Math.cos(angle * (Math.PI / 180)) * newRadius;
    const y = Math.sin(angle * (Math.PI / 180)) * newRadius;

    line.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${angle}deg)`;
    line.classList.add("criclePos");
    circle.appendChild(line);
  }
}

// Initialisiere den Kreis
updateCircle();

// Aktualisiere den Kreis bei Änderungen der Range-Inputs
stricheInput.addEventListener("input", updateCircle);
kreisGroesseInput.addEventListener("input", updateCircle);

const calcBtn = document.getElementById("calc");
const cleanBtn = document.getElementById("clean");

if (calcBtn) {
  calcBtn.addEventListener("click", () => {
    const width = parseFloat(document.getElementById("width").value);
    const height = parseFloat(document.getElementById("height").value);
    const esp = parseFloat(document.getElementById("esp").value);
    const areia = parseFloat(document.getElementById("typeSand").value);
    const pedraInput = parseFloat(document.getElementById("typeStone").value);
    const cimento = parseFloat(document.getElementById("typeCement").value);
    const selectedType = document.getElementById("typeSelect").textContent.trim();
    const isConcrete = selectedType === "Concreto";
    const pedra = isConcrete ? (pedraInput || 0) : 0;

    const hasInvalidMeasure =
      !Number.isFinite(width) ||
      !Number.isFinite(height) ||
      !Number.isFinite(esp) ||
      width <= 0 ||
      height <= 0 ||
      esp <= 0;

    const hasInvalidMix =
      !Number.isFinite(areia) ||
      !Number.isFinite(cimento) ||
      areia < 0 ||
      cimento <= 0 ||
      pedra < 0 ||
      (isConcrete && pedra <= 0);

    if (hasInvalidMeasure || hasInvalidMix) {
      alert("Preencha as medidas e o traço corretamente!");
      return;
    }

    const volume = width * height * (esp / 100);
    const totalParts = areia + pedra + cimento;

    if (totalParts <= 0) {
      alert("Preencha as medidas e o traço corretamente!");
      return;
    }

    const areiaM3 = (areia / totalParts) * volume;
    const pedraM3 = (pedra / totalParts) * volume;
    const cimentoM3 = (cimento / totalParts) * volume;
    const cimentoKg = cimentoM3 * 1400;
    const cimentoSacas = Math.ceil(cimentoKg / 50);
    const areiaBaldes = areiaM3 * 50;
    const pedraBaldes = pedraM3 * 50;

    document.getElementById("resAreia").textContent =
      `${areiaM3.toFixed(2)} m³ ou (${areiaBaldes.toFixed(0)} baldes)`;
    document.getElementById("resPedra").textContent =
      `${pedraM3.toFixed(2)} m³ ou (${pedraBaldes.toFixed(0)} baldes)`;
    document.getElementById("resCimentoSacas").textContent =
      `${cimentoSacas} sacas ou `;
    document.getElementById("resCimentoKg").textContent = `${cimentoKg.toFixed(1)} kg`;
  });
}

if (cleanBtn) {
  cleanBtn.addEventListener("click", () => {
    const inputs = document.querySelectorAll("#materialsPanel input");

    inputs.forEach((input) => {
      input.value = "";
    });

    document.getElementById("measureSelect").textContent = "";
    document.getElementById("resAreia").textContent = "0 m³";
    document.getElementById("resPedra").textContent = "0 m³";
    document.getElementById("resCimentoSacas").textContent = "0 sacas";
    document.getElementById("resCimentoKg").textContent = "0 kg";
  });
}

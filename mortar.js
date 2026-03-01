const mortarType = document.getElementById("mortarType");
const mortarConsumption = document.getElementById("mortarConsumption");
const calcMortarBtn = document.getElementById("calcMortar");
const clearMortarBtn = document.getElementById("clearMortar");

const syncMortarConsumption = () => {
  if (!mortarType || !mortarConsumption) {
    return;
  }

  const selectedOption = mortarType.options[mortarType.selectedIndex];
  const suggestedConsumption = parseFloat(selectedOption.dataset.consumption);

  if (Number.isFinite(suggestedConsumption) && suggestedConsumption > 0) {
    mortarConsumption.value = String(suggestedConsumption);
  }
};

if (mortarType) {
  mortarType.addEventListener("change", syncMortarConsumption);
}

if (calcMortarBtn) {
  calcMortarBtn.addEventListener("click", () => {
    const length = parseFloat(document.getElementById("mortarLength").value);
    const width = parseFloat(document.getElementById("mortarWidth").value);
    const consumption = parseFloat(document.getElementById("mortarConsumption").value);
    const lossPercent = parseFloat(document.getElementById("mortarLoss").value) || 0;

    const hasInvalidData =
      !Number.isFinite(length) ||
      !Number.isFinite(width) ||
      !Number.isFinite(consumption) ||
      !Number.isFinite(lossPercent) ||
      length <= 0 ||
      width <= 0 ||
      consumption <= 0 ||
      lossPercent < 0;

    if (hasInvalidData) {
      alert("Preencha os dados da argamassa corretamente!");
      return;
    }

    const area = length * width;
    const mortarKg = area * consumption * (1 + lossPercent / 100);
    const bags20 = Math.ceil(mortarKg / 20);
    const bags15 = Math.ceil(mortarKg / 15);

    document.getElementById("resMortarArea").textContent = `${area.toFixed(2)} m²`;
    document.getElementById("resMortarKg").textContent = `${mortarKg.toFixed(1)} kg`;
    document.getElementById("resMortarBags20").textContent = `${bags20} unidades`;
    document.getElementById("resMortarBags15").textContent = `${bags15} unidades`;
  });
}

if (clearMortarBtn) {
  clearMortarBtn.addEventListener("click", () => {
    document.getElementById("mortarLength").value = "";
    document.getElementById("mortarWidth").value = "";
    document.getElementById("mortarLoss").value = "10";
    syncMortarConsumption();
    document.getElementById("resMortarArea").textContent = "0 m²";
    document.getElementById("resMortarKg").textContent = "0 kg";
    document.getElementById("resMortarBags20").textContent = "0 unidades";
    document.getElementById("resMortarBags15").textContent = "0 unidades";
  });
}

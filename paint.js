const tabButtons = document.querySelectorAll("[data-tab-target]");
const tabPanels = document.querySelectorAll(".tab-panel");

const setActiveTab = (targetId) => {
  tabButtons.forEach((button) => {
    const isActive = button.dataset.tabTarget === targetId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });

  tabPanels.forEach((panel) => {
    const isActive = panel.id === targetId;
    panel.hidden = !isActive;
  });
};

if (tabButtons.length > 0 && tabPanels.length > 0) {
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveTab(button.dataset.tabTarget);
    });
  });
}

const calcPaintBtn = document.getElementById("calcPaint");
const clearPaintBtn = document.getElementById("clearPaint");

if (calcPaintBtn) {
  calcPaintBtn.addEventListener("click", () => {
    const width = parseFloat(document.getElementById("paintWidth").value);
    const height = parseFloat(document.getElementById("paintHeight").value);
    const coats = parseFloat(document.getElementById("paintCoats").value);
    const yieldPerLiter = parseFloat(document.getElementById("paintYield").value);
    const lossPercent = parseFloat(document.getElementById("paintLoss").value) || 0;

    const hasInvalidData =
      !Number.isFinite(width) ||
      !Number.isFinite(height) ||
      !Number.isFinite(coats) ||
      !Number.isFinite(yieldPerLiter) ||
      !Number.isFinite(lossPercent) ||
      width <= 0 ||
      height <= 0 ||
      coats <= 0 ||
      yieldPerLiter <= 0 ||
      lossPercent < 0;

    if (hasInvalidData) {
      alert("Preencha os dados da tinta corretamente!");
      return;
    }

    const baseArea = width * height;
    const paintArea = baseArea * coats;
    const baseLiters = paintArea / yieldPerLiter;
    const totalLiters = baseLiters * (1 + lossPercent / 100);
    const cans18L = Math.ceil(totalLiters / 18);
    const gallons36L = Math.ceil(totalLiters / 3.6);

    document.getElementById("resPaintArea").textContent =
      `${paintArea.toFixed(2)} m²`;
    document.getElementById("resPaintLiters").textContent =
      `${totalLiters.toFixed(2)} L`;
    document.getElementById("resPaint18").textContent = `${cans18L} unidades`;
    document.getElementById("resPaint36").textContent = `${gallons36L} unidades`;
  });
}

if (clearPaintBtn) {
  clearPaintBtn.addEventListener("click", () => {
    document.getElementById("paintWidth").value = "";
    document.getElementById("paintHeight").value = "";
    document.getElementById("paintCoats").value = "2";
    document.getElementById("paintYield").value = "10";
    document.getElementById("paintLoss").value = "10";
    document.getElementById("resPaintArea").textContent = "0 m²";
    document.getElementById("resPaintLiters").textContent = "0 L";
    document.getElementById("resPaint18").textContent = "0 unidades";
    document.getElementById("resPaint36").textContent = "0 unidades";
  });
}

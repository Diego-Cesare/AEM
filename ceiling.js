const calcCeilingBtn = document.getElementById("calcCeiling");
const clearCeilingBtn = document.getElementById("clearCeiling");

const getCeilingDirectionData = (length, width, spacingMeters, direction) => {
  const byLength = {
    label: "Ripas no comprimento",
    lines: Math.ceil(width / spacingMeters) + 1,
    runLength: length,
  };

  const byWidth = {
    label: "Ripas na largura",
    lines: Math.ceil(length / spacingMeters) + 1,
    runLength: width,
  };

  byLength.woodLinear = byLength.lines * byLength.runLength;
  byWidth.woodLinear = byWidth.lines * byWidth.runLength;

  if (direction === "length") {
    return byLength;
  }

  if (direction === "width") {
    return byWidth;
  }

  return byLength.woodLinear <= byWidth.woodLinear ? byLength : byWidth;
};

if (calcCeilingBtn) {
  calcCeilingBtn.addEventListener("click", () => {
    const length = parseFloat(document.getElementById("ceilingLength").value);
    const width = parseFloat(document.getElementById("ceilingWidth").value);
    const spacingCm = parseFloat(document.getElementById("ceilingSpacing").value);
    const woodLoss = parseFloat(document.getElementById("ceilingWoodLoss").value) || 0;
    const liningLoss = parseFloat(document.getElementById("ceilingLiningLoss").value) || 0;
    const direction = document.getElementById("ceilingDirection").value;
    const usePerimeter = document.getElementById("ceilingPerimeter").value === "yes";

    const hasInvalidData =
      !Number.isFinite(length) ||
      !Number.isFinite(width) ||
      !Number.isFinite(spacingCm) ||
      !Number.isFinite(woodLoss) ||
      !Number.isFinite(liningLoss) ||
      length <= 0 ||
      width <= 0 ||
      spacingCm <= 0 ||
      woodLoss < 0 ||
      liningLoss < 0;

    if (hasInvalidData) {
      alert("Preencha os dados do forro corretamente!");
      return;
    }

    const spacingMeters = spacingCm / 100;
    const area = length * width;
    const areaWithLoss = area * (1 + liningLoss / 100);
    const directionData = getCeilingDirectionData(length, width, spacingMeters, direction);
    const perimeterLinear = usePerimeter ? 2 * (length + width) : 0;
    const woodLinearTotal = directionData.woodLinear + perimeterLinear;
    const woodLinearWithLoss = woodLinearTotal * (1 + woodLoss / 100);

    document.getElementById("resCeilingArea").textContent = `${area.toFixed(2)} m²`;
    document.getElementById("resCeilingAreaWithLoss").textContent =
      `${areaWithLoss.toFixed(2)} m²`;
    document.getElementById("resCeilingDirection").textContent = directionData.label;
    document.getElementById("resCeilingLines").textContent = `${directionData.lines} linhas`;
    document.getElementById("resCeilingWoodLinear").textContent =
      `${directionData.woodLinear.toFixed(2)} m linear`;
    document.getElementById("resCeilingPerimeter").textContent =
      `${perimeterLinear.toFixed(2)} m linear`;
    document.getElementById("resCeilingWoodTotal").textContent =
      `${woodLinearTotal.toFixed(2)} m linear`;
    document.getElementById("resCeilingWoodWithLoss").textContent =
      `${woodLinearWithLoss.toFixed(2)} m linear`;
  });
}

if (clearCeilingBtn) {
  clearCeilingBtn.addEventListener("click", () => {
    document.getElementById("ceilingLength").value = "";
    document.getElementById("ceilingWidth").value = "";
    document.getElementById("ceilingSpacing").value = "40";
    document.getElementById("ceilingDirection").value = "auto";
    document.getElementById("ceilingPerimeter").value = "yes";
    document.getElementById("ceilingWoodLoss").value = "10";
    document.getElementById("ceilingLiningLoss").value = "10";

    document.getElementById("resCeilingArea").textContent = "0 m²";
    document.getElementById("resCeilingAreaWithLoss").textContent = "0 m²";
    document.getElementById("resCeilingDirection").textContent = "-";
    document.getElementById("resCeilingLines").textContent = "0 linhas";
    document.getElementById("resCeilingWoodLinear").textContent = "0 m linear";
    document.getElementById("resCeilingPerimeter").textContent = "0 m linear";
    document.getElementById("resCeilingWoodTotal").textContent = "0 m linear";
    document.getElementById("resCeilingWoodWithLoss").textContent = "0 m linear";
  });
}

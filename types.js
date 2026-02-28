const concret = document.getElementById("concret");
const subfloor = document.getElementById("subfloor");
const plaster = document.getElementById("plaster");
const typeSelect = document.getElementById("typeSelect");
const measureSelect = document.getElementById("measureSelect");
const setMeasure = document.getElementById("setMeasure");
const typeSand = document.getElementById("typeSand");
const typeStone = document.getElementById("typeStone");
const typeCement = document.getElementById("typeCement");

const btns = [concret, subfloor, plaster].filter(Boolean);

if (btns.length > 0 && typeSelect && typeStone) {
  const isConcrete = (btn) => btn && btn.id === "concret";
  let initialType = concret || btns[0];
  const setSelectedButton = (btn) => {
    if (initialType) {
      initialType.classList.remove("is-selected");
      initialType.setAttribute("aria-pressed", "false");
    }

    initialType = btn;
    initialType.classList.add("is-selected");
    initialType.setAttribute("aria-pressed", "true");
    typeSelect.textContent = initialType.textContent;
  };

  const syncStoneInput = () => {
    if (isConcrete(initialType)) {
      typeStone.style.display = "";
      typeStone.disabled = false;
      return;
    }

    typeStone.style.display = "none";
    typeStone.disabled = true;
    typeStone.value = "";
  };

  setSelectedButton(initialType);
  syncStoneInput();

  btns.forEach((btn) => {
    btn.addEventListener("click", () => {
      setSelectedButton(btn);
      syncStoneInput();
    });
  });

  if (setMeasure && measureSelect && typeSand && typeCement) {
    setMeasure.addEventListener("click", () => {
      if (isConcrete(initialType)) {
        measureSelect.textContent =
          `${typeCement.value}:${typeSand.value}:${typeStone.value}`;
        return;
      }

      measureSelect.textContent = `${typeCement.value}:${typeSand.value}`;
    });
  }
}

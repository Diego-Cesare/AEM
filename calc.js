const calcBtn = document.getElementById("calc");
const cleanBtn = document.getElementById('clean')

calcBtn.addEventListener("click", () => {
    // pegar medidas
    const width = parseFloat(document.getElementById("width").value) || 0;
    const height = parseFloat(document.getElementById("height").value) || 0;
    const esp = parseFloat(document.getElementById("esp").value) || 0;

    // volume em m³ (espessura convertida para metros)
    const volume = width * height * (esp / 100);

    // pegar traço informado
    const areia = parseFloat(document.getElementById("typeSand").value) || 0;
    const pedra = parseFloat(document.getElementById("typeStone").value) || 0;
    const cimento = parseFloat(document.getElementById("typeCement").value) || 0;

    // soma das partes
    const totalParts = areia + pedra + cimento;

    if (totalParts === 0 || volume === 0) {
        alert("Preencha as medidas e o traço corretamente!");
        return;
    }

    // proporção
    const areiaM3 = (areia / totalParts) * volume;
    const pedraM3 = (pedra / totalParts) * volume;
    const cimentoM3 = (cimento / totalParts) * volume;

    // conversão do cimento (1 saca = 50kg, densidade ~1400 kg/m³)
    const cimentoKg = cimentoM3 * 1400;
    const cimentoSacas = Math.ceil(cimentoKg / 50);

    // atualizar tabela
    const areiaBaldes = areiaM3 * 50;
    const pedraBaldes = pedraM3 * 50;

    document.getElementById("resAreia").textContent =
        `${areiaM3.toFixed(2)} m³ ou (${areiaBaldes.toFixed(0)} baldes)`;

    document.getElementById("resPedra").textContent =
        `${pedraM3.toFixed(2)} m³ ou (${pedraBaldes.toFixed(0)} baldes)`;

    document.getElementById("resCimentoSacas").textContent =
        cimentoSacas + " sacas ou ";

    document.getElementById("resCimentoKg").textContent =
        cimentoKg.toFixed(1) + " kg";
});

cleanBtn.addEventListener('click', () => {
    // pega todos inputs dentro da página
    const inputs = document.querySelectorAll("input");

    inputs.forEach(input => {
        input.value = ""; // limpa o valor
    });

})
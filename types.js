// const concret = document.getElementById('concret')
const subfloor = document.getElementById('subfloor')
// const plaster = document.getElementById('plaster')
const typeSelect = document.getElementById('typeSelect')

let initialType = concret

const btns = document.querySelectorAll('#concret, #subfloor, #plaster')


const setMeasure = document.getElementById('setMeasure')
const typeSand = document.getElementById('typeSand')
const typeStone = document.getElementById('typeStone')
const typeCement = document.getElementById('typeCement')


initialType.style.backgroundColor = 'var(--alt-bg)'
typeSelect.textContent = initialType.textContent

btns.forEach((bnt) => {
    bnt.addEventListener('click', () => {
        initialType.style.backgroundColor = '';
        typeSelect.textContent = ''
        initialType = bnt;

        initialType.style.backgroundColor = 'var(--alt-bg)';
        typeSelect.textContent = initialType.textContent

        if (initialType.textContent == 'Concreto') {
            document.getElementById('typeStone').style.display = 'flex'
        } else {
            document.getElementById('typeStone').style.display = 'none'
        }

    })
})


setMeasure.addEventListener('click', () => {
    let measureOutPut = ''
    if (initialType.textContent == 'Concreto') {
        measureOutPut = `${typeCement.value}:${typeSand.value}:${typeStone.value}`
    } else {
        measureOutPut = `${typeCement.value}:${typeSand.value}`
    }
    document.getElementById('measureSelect').textContent = measureOutPut
})
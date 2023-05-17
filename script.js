window.addEventListener('load', async () => {
    let i = 1
    let data;
    const pDate = document.querySelector('#date')

    await fetch('https://covid19-brazil-api.now.sh/api/report/v1')
    .then(res => res.json())
    .then(json => data = json.data)

    pDate.innerHTML = pDate.innerHTML + FormatDate(data[0].datetime)

    data.forEach((item) => {
        addRow('table', item, i)
        i++
    })
})

const FormatDate = (date) => {
    function FixDigits(num){
        return num.toString().length === 1 ? '0' + num : num
    }

    let dateInstance = new Date(date)
    dateInstance = `${FixDigits(dateInstance.getDate())}/${FixDigits(dateInstance.getMonth() + 1)}/${dateInstance.getFullYear()}`
    return dateInstance
}

function addRow(tableID, data, id) {
    const table = document.querySelector('#' + tableID)
    const newRow = table.insertRow(-1)

    const cells = {
        id: newRow.insertCell(0),
        uf: newRow.insertCell(1),
        state: newRow.insertCell(2),
        cases: newRow.insertCell(3),
        deaths: newRow.insertCell(4),
        suspects: newRow.insertCell(5),
        refuses: newRow.insertCell(6),
    }

    addDataOnRows(id, id, cells.id)
    addDataOnRows(id, data.uf, cells.uf)
    addDataOnRows(id, data.state, cells.state)
    addDataOnRows(id, data.cases, cells.cases)
    addDataOnRows(id, data.deaths, cells.deaths)
    addDataOnRows(id, data.suspects, cells.suspects)
    addDataOnRows(id, data.refuses, cells.refuses)
}

function addDataOnRows(id, data, cell){
    id % 2 === 1 ? cell.style.backgroundColor = '#f2f2f2' : null

    let text = document.createTextNode(data)
    cell.appendChild(text)
}
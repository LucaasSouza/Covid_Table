window.addEventListener('load', async () => {  //Faz a requisição dos dados assim que a tela é carregada
    let i = 1 //Será o id das rows
    let data; //Armazenará os dados vindos da API
    const pDate = document.querySelector('#date')

    await fetch('https://covid19-brazil-api.now.sh/api/report/v1')
    .then(res => res.json())
    .then(json => data = json.data)

    pDate.innerHTML = pDate.innerHTML + FormatDate(data[0].datetime) //Mostra na tela a data da ultima atualização da API

    data.forEach((item) => { //Percorre cada item do objeto, passando por parâmetro o id da tabela, as informações contidas no objeto e seu id
        addRow('table', item, i)
        i++
    })
})

const FormatDate = (date) => { // Formata a data em dd/mm/yyyy
    function FixDigits(num){ //Adiciona um 0 caso o dd ou mm tenha somente um dígito
        return num.toString().length === 1 ? '0' + num : num
    }

    let dateInstance = new Date(date)
    dateInstance = `${FixDigits(dateInstance.getDate())}/${FixDigits(dateInstance.getMonth() + 1)}/${dateInstance.getFullYear()}`
    return dateInstance //Retorna em dd/mm/yyyy
}

function addRow(tableID, data, id) { //Adiciona as rows na tabela
    const table = document.querySelector('#' + tableID)
    const newRow = table.insertRow(-1)

    const cells = { //Objeto que contém as células das rows
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

function addDataOnRows(id, data, cell){ //Adiciona os dados nas rows, e define sua cor de fundo com base no seu id
    id % 2 === 1 ? cell.style.backgroundColor = '#f2f2f2' : null

    let text = document.createTextNode(data)
    cell.appendChild(text)
}
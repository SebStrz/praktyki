var table = "a"
var historyCount = 1
async function getCurrencyData() {
    //table = document.querySelector("#tables").value
    try{
        const response = await fetch("https://api.nbp.pl/api/exchangerates/tables/"+table+"/?format=json")
        if(!response.ok){
            throw new Error("Błąd: "+response.status)
        }
        
        let json = await response.json()
     
        json = json[0]
        document.querySelector("#source").innerHTML = "<option value=\"pln\">Złoty</option>"
        document.querySelector("#target").innerHTML = "<option value=\"pln\">Złoty</option>"
        json.rates.forEach(element => {
            document.querySelector("#source").innerHTML +="<option value=\""+element.code+"\">"+element.currency+"</option>"
            document.querySelector("#target").innerHTML +="<option value=\""+element.code+"\">"+element.currency+"</option>"
        })
    }
    catch (error) {
        console.error(error.message)
    }
}

async function DisplayCurrency(){
    let target = (document.querySelector("#target").value).toLowerCase()
    let source = (document.querySelector("#source").value).toLowerCase()
    let targetNumber = document.querySelector("#targetNumber")
    let sourceNumber = document.querySelector("#sourceNumber")
    let spinner = document.querySelector(".spinner-border")
    spinner.classList.remove("invisible")
    if( source == "pln"){
        try{
            const response = await fetch("https://api.nbp.pl/api/exchangerates/rates/"+table+"/"+target+"/last/7/?format=json")
            if(!response.ok){
                throw new Error("Błąd: "+response.status)
            }
            let json = await response.json()
            let rate = json.rates[0].mid
            targetNumber.value = (sourceNumber.value / rate).toFixed(2)
            document.querySelector("#rate").innerHTML = `1 Złoty to ${(1/rate).toFixed(2)} ${json.currency}`
            buildChart(json)
            appendHistory(undefined,json.currency,sourceNumber.value,(sourceNumber.value / rate).toFixed(2))
        } catch (err){
            console.error(err.message)
        }
    } else {
        try{
            const response = await fetch("https://api.nbp.pl/api/exchangerates/rates/"+table+"/"+source+"/last/7/?format=json")
            if(!response.ok){
                throw new Error("Błąd: "+response.status)
            }
            let json = await response.json()
            let rate = json.rates[0].mid
            targetNumber.value = (sourceNumber.value * rate).toFixed(2)
            document.querySelector("#rate").innerHTML = `1 Złoty to ${(1/rate).toFixed(2)} ${json.currency}`
            buildChart(json)
            appendHistory(json.currency,undefined,sourceNumber.value,(sourceNumber.value * rate).toFixed(2))
        } catch (err){
            console.error(err.message)
        }
    }
    spinner.classList.add("invisible")

    // try{
    //     const response = await fetch("https://api.nbp.pl/api/exchangerates/rates/"+table+"/"+code+"/?format=json")
    //     if(!response.ok){
    //         throw new Error("Błąd: "+response.status)
    //     }
    //     let json = await response.json()
    //     document.querySelector("#currencyTable").innerHTML = createTable(json)
    // } catch (err){
    //     console.error(error.message)
    // }
}
function appendHistory(sourceP = "Złoty",targetP = "Złoty",sourceNumberP,targetNumberP){
    let row = document.createElement("tr")
    document.querySelector("table>tbody").appendChild(row)
    row.innerHTML += `<td scope=\"row\">${historyCount}</td>`
    row.innerHTML += `<td>${sourceP}</td>`
    row.innerHTML += `<td>${sourceNumberP}</td>`
    row.innerHTML += `<td>${targetP}</td>`
    row.innerHTML += `<td>${targetNumberP}</td>`
    historyCount++
}

function buildChart(data){
    let parent = targetNumber.parentElement.parentElement
    

    if( parent.parentElement.children.length > 1){
        parent.parentElement.children[1].remove()
    }
    let sectionEle = document.createElement("section")
    let canvasEle = document.createElement("canvas")
    let labels = []
    let values = []

    parent.classList.replace("col","col-6")
    parent.parentElement.appendChild(sectionEle)
    sectionEle.classList.add("col-6")
    sectionEle.appendChild(canvasEle)

    


    data.rates.forEach(e => {
        labels.push(e.effectiveDate)
        values.push(1/e.mid)
    })

    new Chart(canvasEle,{
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: null,
                data: values,
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    })
}

async function getGoldData(){
    try{
        const response = await fetch("https://api.nbp.pl/api/cenyzlota/last/30/?format=json")
        if(!response.ok){
            throw new Error("Błąd: "+response.status)
        }
        let json = await response.json()
        let length = json.length-1
        document.querySelector("#goldPrice").innerHTML = `Cena złota: ${json[length].cena}. Stan na dzień: ${json[length].data}`
        createGoldChart(json)
    } catch (err) {
        console.error(err.message)
    }
}

function createGoldChart(data){
    const element = document.querySelector("#goldChart")
    let labels = []
    let values = []
    data.forEach(e => {
        labels.push(e.data)
        values.push(e.cena)
    })
    new Chart(element,{
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: "cena złota(pln)",
                data: values,
                borderWidth: 1
            }]
        }
    })

}

function createTable(data){
    if( table == "c") return `<table><tr><td>Nazwa Waluty</td><td>Cena Sprzedarzy</td><td>Cena Zakupy</td></tr><tr><td>${data.currency}</td><td>${data.rates[0].ask}</td><td>${data.rates[0].bid}</td></tr></table>`
    else return `<table><tr><td>Nazwa Waluty</td><td>Średni kurs waluty</td></tr><tr><td>${data.currency}</td><td>${data.rates[0].mid}</td></tr></table>`
}

function targetAndSourceSwitch(){
    let target = (document.querySelector("#target").value).toLowerCase()
    let source = (document.querySelector("#source").value).toLowerCase()
    let targetElem = document.querySelector("#target")
    let sourceElem = document.querySelector("#source")

    document.querySelector("#targetNumber").value = 0

    sourceElem.disabled = false
    targetElem.disabled = false

    if( target != "pln"){
        sourceElem.selectedIndex = 0
        sourceElem.disabled = true
    } else if( source != "pln"){
        targetElem.selectedIndex = 0
        targetElem.disabled = true
    }

}




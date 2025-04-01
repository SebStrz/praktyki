var table = "c"
async function getCurrencyData() {
    table = document.querySelector("#tables").value ?? "c"
    try{
        const response = await fetch("https://api.nbp.pl/api/exchangerates/tables/"+table+"/?format=json")
        if(!response.ok){
            throw new Error("Błąd: "+response.status)
        }
        
        let json = await response.json()
     
        json = json[0]
        document.querySelector("#currencies").innerHTML = ""
        json.rates.forEach(element => {
            document.querySelector("#currencies").innerHTML +="<option value=\""+element.code+"\">"+element.currency+"</option>"
        })
    }
    catch (error) {
        console.error(error.message)
    }
}

async function DisplayCurrency(){
    let code = (document.querySelector("#currencies").value).toLowerCase()

    try{
        const response = await fetch("https://api.nbp.pl/api/exchangerates/rates/"+table+"/"+code+"/?format=json")
        if(!response.ok){
            throw new Error("Błąd: "+response.status)
        }
        let json = await response.json()
        document.querySelector("#currencyTable").innerHTML = createTable(json)
    } catch (err){
        console.error(error.message)
    }
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
        console.error(error.message)
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





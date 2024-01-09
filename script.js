const apiKey = "7a70d143-15d9-4666-8aab-21c06fcfd6f9"
const mainUrl = "http://exam-2023-1-api.std-900.ist.mospolytech.ru"
const routeUrl = "/api/routes"

function selectRoute(event){

}

function addTableData(record) {
    const tr = document.createElement('tr');
    tr.id = record.id;
    const name = document.createElement('td');
    name.textContent = record.name;
    tr.append(name);
    const description = document.createElement('td');
    description.textContent = record.descriprion;
    tr.append(description);
    const mainObject = document.createElement('td');
    mainObject.textContent = record.mainObject;
    tr.append(mainObject);
    const tdBtn = document.createElement("td")
    tdBtn.textContent = "Выбрать";
    tdBtn.addEventListener("click", selectRoute);
}

function splitObject(mainObject) {
    if (mainObject.match(/, /g)>=mainObject.match(/\./g) && mainObject.match(/,/g) > mainObject.match(/-/g)) {
        return mainObject.split("-")
    }
}

function getData() {
    const xhr = new XMLHttpRequest();
    const url = new URL(routeUrl, mainUrl);
    url.searchParams.set('api_key', apiKey);
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function() {
        const records = JSON.parse(xhr.response);
        const tbody = document.querySelector('.tbody');
        for (const record of records) {
            console.log(record);
            tbody.innerHTML += `<tr id = ${record.id}>
            <td>${record.name}</td>
            <td>${record.description}</td>
            <td>${record.mainObject}</td>
            <td><button>Выбрать</button></td>`
        }
    }
}

window.addEventListener("DOMContentLoaded", ()=>{
    getData();
})
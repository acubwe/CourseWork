'use strict'
const apiKey = "7a70d143-15d9-4666-8aab-21c06fcfd6f9"
const mainUrl = "http://exam-2023-1-api.std-900.ist.mospolytech.ru"
const routeUrl = "/api/routes"

const tbody = document.querySelector(".tbody");

function addTableData(record) {
    const tr = document.createElement('tr');
    tr.id = record.id;
    const name = document.createElement('td');
    name.textContent = record.name;
    tr.append(name);
    const description = document.createElement('td');
    description.textContent = record.description;
    tr.append(description);
    const mainObject = document.createElement('td');
    mainObject.textContent = record.mainObject;
    tr.append(mainObject);
    const tdBtn = document.createElement('button')
    tdBtn.textContent = "Выбрать";
    tdBtn.addEventListener("click", event => guidsData(tr, event));
    tr.append(tdBtn);
    tbody.appendChild(tr);

}

function splitMainObject(value) {
    console.log(value.match(/,/g)?.length)
    if (value.match(/,/g)?.length>=value.match(/\./g)?.length && value.match(/,/g)?.length>value.match(/-/g)?.length) {
        return value.split(',');
    }
    if (value.match(/\./g)?.length>value.match(/-/g)?.length && value.match(/\./g)?.length>=value.match(/,/g)?.length) {
        return value.split('.');
    }
        return value.split('-')
}


function getData() {
    const xhr = new XMLHttpRequest();
    const url = new URL(routeUrl, mainUrl);
    url.searchParams.set('api_key', apiKey);
    xhr.open('GET', url);
    xhr.onload = function() {
        const records = JSON.parse(xhr.response);
        for (const record of records) {
            const select = document.querySelector('.form-select');
            for (const elem of splitMainObject(record.mainObject)) {
                const option = document.createElement("option");
                option.textContent = elem;
                select.append(option);
            };
            addTableData(record);
        }
    }
    xhr.send();
}

function guidsData(tr, event) {
    tbodyguids.innerHTML = ""
    const guidsRoad = tr.id;
    const guidesUrl = `/api/routes/${guidsRoad}/guides`;
    const xhr = new XMLHttpRequest();
    const newUrl = new URL(guidesUrl, mainUrl);
    newUrl.searchParams.set('api_key', apiKey);
    xhr.open("GET", newUrl);
    xhr.onload = function() {
        const records = JSON.parse(xhr.response);
        console.log(guidesUrl);
        for (const record of records) {
            console.log(record);
            addDataGuids(record);
        }
    };
    xhr.send();
}

const tbodyguids = document.querySelector(".tbody-guids")


function addDataGuids(record) {
    const tr = document.createElement('tr');
    tr.id = record.id;
    const name = document.createElement('td');
    name.textContent = record.name;
    tr.append(name);
    const language = document.createElement('td');
    language.textContent = record.language;
    tr.append(language);
    const workExperience = document.createElement('td');
    workExperience.textContent = record.workExperience;
    tr.append(workExperience);
    const pricePerHour = document.createElement('td');
    pricePerHour.textContent = `${record.pricePerHour}₽`;
    tr.append(pricePerHour);
    const tdBtn = document.createElement('button')
    tdBtn.textContent = "Выбрать";
    tdBtn.addEventListener("click", event => modal(record));
    tdBtn.setAttribute("data-bs-toggle", "modal")
    tdBtn.setAttribute("data-bs-target", "#exampleModal")
    tr.append(tdBtn);
    tbodyguids.appendChild(tr)
}

const modalwindow = document.querySelector(".modal-dialog modal-dialog-centered")

function modal(record) {
    const name = document.querySelector('.guidname');
    name.textContent = `ФИО гида: ${record.name}`
    const cost = document.querySelector('.costroad');
    cost.textContent = `Цена прогулки: ${record.pricePerHour}₽`;
}

window.addEventListener("DOMContentLoaded", ()=>{
    getData();
})
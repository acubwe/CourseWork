'use strict'
const apiKey = "7a70d143-15d9-4666-8aab-21c06fcfd6f9"
const mainUrl = "http://exam-2023-1-api.std-900.ist.mospolytech.ru"
const routeUrl = "/api/routes"

const tbody = document.querySelector(".tbody");

let perPage = 3
let curPage = 1
let totalPages = 0

function addTableData(records) {
    tbody.innerHTML = '';
    for (const record of records) {
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

function paginationRoads() {
    const pagination = document.querySelector(".pagination")
    pagination.innerHTML = '';
    const prevBtn = document.createElement("button");
    prevBtn.textContent = 'Назад';
    prevBtn.style.margin = '2px';
    prevBtn.style.backgroundColor = 'none';
    prevBtn.addEventListener('click', (event) => {
        if (curPage > 1) {
            curPage--;
            getData();
        }
    });
    pagination.append(prevBtn);

    for (curPage >= 2 let i = 1; i <= totalPages; i++) {
        const numBtn = document.createElement("button")
        numBtn.textContent = i;
        numBtn.addEventListener('click', (event) => {
            const target = event.target;
            curPage = target.textContent;
            getData();
        })
        if (i == curPage) {
            numBtn.style.backgroundColor = '#d0d2bf';
        }
        else {
            numBtn.style.backgroundColor = '#F8FAE5';
        }
        pagination.append(numBtn);
    }

    const nextBtn = document.createElement("button");
    nextBtn.textContent = 'Дальше';
    nextBtn.style.margin = '2px';
    nextBtn.style.backgroundColor = 'none';
    nextBtn.addEventListener('click', (event) => {
        if (curPage < totalPages) {
            curPage++;
            getData();
        }
    });
    pagination.append(nextBtn);
}


function getData() {
    const xhr = new XMLHttpRequest();
    const url = new URL(routeUrl, mainUrl);
    url.searchParams.set('api_key', apiKey);
    xhr.open('GET', url);
    xhr.onload = function() {
        const records = JSON.parse(xhr.response);
        totalPages = Math.ceil(records.length / perPage)
        const start = curPage * perPage - perPage;
        const end = curPage * perPage;
        for (const record of records) {
            const select = document.querySelector('.form-select');
            for (const elem of splitMainObject(record.mainObject)) {
                const option = document.createElement("option");
                option.textContent = elem;
                select.append(option);
            };
        }
        addTableData(records.slice(start, end));
        paginationRoads();
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
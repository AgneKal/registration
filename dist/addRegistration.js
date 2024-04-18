import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const yearInput = document.getElementById('year');
const maleCheck = document.getElementById('male');
const femaleCheck = document.getElementById('female');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const resultTable = document.getElementById('resultTable');
export const addRegistration = () => {
    const genderInp = maleCheck.checked ? 'Vaikinas' : femaleCheck.checked ? 'Mergina' : 'nepasirinkta';
    const reg = {
        name: nameInput.value,
        surname: surnameInput.value,
        birthYear: yearInput.valueAsNumber,
        gender: genderInp,
        email: emailInput.value,
        phone: phoneInput.value,
    };
    fetchRegistrations('registrations', 'POST', reg)
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        return data;
    });
    nameInput.value = "";
    surnameInput.value = "";
    yearInput.value = "";
    maleCheck.checked = false;
    femaleCheck.checked = false;
    emailInput.value = "";
    phoneInput.value = "";
    resultTable.style.display = 'none';
    loadData();
};

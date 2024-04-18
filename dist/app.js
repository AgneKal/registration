import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { loginExsec, registerExsec } from "./auth.js";
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const yearInput = document.getElementById('year');
const maleCheck = document.getElementById('male');
const femaleCheck = document.getElementById('female');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const addRegistrationBtn = document.getElementById('addRegistrationBtn');
const loadDataBtn = document.getElementById('getData');
const resultTable = document.getElementById('resultTable');
resultTable.style.display = 'none';
export const registrationData = [];
addRegistrationBtn.onclick = () => {
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
};
document.getElementById('loginSection').style.display = "block";
document.getElementById('dataSection').style.display = "none";
document.getElementById('loginError').style.display = "none";
loadDataBtn.onclick = loadData;
export const userInfo = {
    email: '',
    idToken: '',
    loggedin: false,
};
document.getElementById('loginBtn').onclick = loginExsec;
document.getElementById('registerBtn').onclick = registerExsec;

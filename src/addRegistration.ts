import { fetchRegistrations } from "./fetchData.js";
import { loadData } from "./loadData.js";
import { Registration } from "./registration.js";

const nameInput = <HTMLInputElement>document.getElementById('name');
const surnameInput = <HTMLInputElement>document.getElementById('surname');
const yearInput = <HTMLInputElement>document.getElementById('year');

const maleCheck=(<HTMLInputElement | null>document.getElementById('male'))!;
const femaleCheck=(<HTMLInputElement | null>document.getElementById('female'))!;

const emailInput = <HTMLInputElement>document.getElementById('email');
const phoneInput = <HTMLInputElement>document.getElementById('phone');


const resultTable = <HTMLElement>document.getElementById('resultTable');

export const addRegistration = () => {
    const genderInp = maleCheck.checked ? 'Vaikinas' : femaleCheck.checked ? 'Mergina' : 'nepasirinkta';

    const reg: Registration = {
        name: nameInput.value,
        surname: surnameInput.value,
        birthYear: yearInput.valueAsNumber,
        gender: genderInp,
        email: emailInput.value,
        phone: phoneInput.value,
    }
    fetchRegistrations('registrations', 'POST', reg)
    .then ((response)=> {
        return response.json();
    })
    .then ((data) => {
        return data
    })
    nameInput.value = "";
    surnameInput.value = "";
    yearInput.value = "";
    maleCheck.checked = false;
    femaleCheck.checked = false;
    emailInput.value = "";
    phoneInput.value = "";
    resultTable.style.display = 'none';
    loadData();
}
import { fetchRegistrations } from "./fetchData.js";
import { Registration } from "./registration.js";
import { loadData } from "./loadData.js";
import { loginExsec, registerExsec } from "./auth.js";

const nameInput = <HTMLInputElement>document.getElementById('name');
const surnameInput = <HTMLInputElement>document.getElementById('surname');
const yearInput = <HTMLInputElement>document.getElementById('year');

const maleCheck=(<HTMLInputElement | null>document.getElementById('male'))!;
const femaleCheck=(<HTMLInputElement | null>document.getElementById('female'))!;

const emailInput = <HTMLInputElement>document.getElementById('email');
const phoneInput = <HTMLInputElement>document.getElementById('phone');

const addRegistrationBtn = <HTMLButtonElement>document.getElementById('addRegistrationBtn');

const loadDataBtn = <HTMLButtonElement>document.getElementById('getData');

const resultTable = <HTMLElement>document.getElementById('resultTable');

resultTable.style.display = 'none';
export const registrationData:Registration[]=[];

addRegistrationBtn.onclick = () => {
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
    nameInput.value="";
    surnameInput.value="";
    yearInput.value="";
    maleCheck.checked = false;
    femaleCheck.checked = false;
    emailInput.value="";
    phoneInput.value="";
    resultTable.style.display = 'none';
}

(<HTMLElement>document.getElementById('loginSection')).style.display = "block";
(<HTMLElement>document.getElementById('dataSection')).style.display = "none";
(<HTMLElement>document.getElementById('loginError')).style.display = "none";

loadDataBtn.onclick = loadData;

export const userInfo = {
    email: '',
    idToken: '',
    loggedin: false,
};

(<HTMLButtonElement>document.getElementById('loginBtn')).onclick = loginExsec;
(<HTMLButtonElement>document.getElementById('registerBtn')).onclick = registerExsec;
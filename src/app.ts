import { Registration } from "./registration.js";
import { loadData } from "./loadData.js";
import { loginExsec, registerExsec } from "./auth.js";
import { addRegistration } from "./addRegistration.js";

export const registrationData:Registration[]=[];

(<HTMLElement>document.getElementById('menu')).style.display = "none";
(<HTMLElement>document.getElementById('loginSection')).style.display = "flex";
(<HTMLElement>document.getElementById('loginError')).style.display = "none";
(<HTMLElement>document.getElementById('dataSection')).style.display = "none";

(<HTMLButtonElement>document.getElementById('addRegistrationBtn')).onclick = addRegistration;
(<HTMLButtonElement>document.getElementById('getData')).onclick = loadData;

export const userInfo = {
    email: '',
    idToken: '',
    loggedin: false,
};

(<HTMLButtonElement>document.getElementById('loginBtn')).onclick = loginExsec;
(<HTMLButtonElement>document.getElementById('registerBtn')).onclick = registerExsec;

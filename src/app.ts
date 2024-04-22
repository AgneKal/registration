import { Registration } from "./registration.js";
import { loadData } from "./loadData.js";
import { loadUser, loginExsec, registerExsec, showLogin } from "./auth.js";
import { addRegistration } from "./addRegistration.js";
import { User } from "./user.js";

export const registrationData:Registration[]=[];


(<HTMLElement>document.getElementById('changeEmailSection')).style.display = 'none';
(<HTMLElement>document.getElementById('changePasswordSection')).style.display = 'none';
(<HTMLButtonElement>document.getElementById('addRegistrationBtn')).onclick = addRegistration;


export const userInfo:User = {
    email: '',
    idToken: '',
    loggedin: false,
};

showLogin();
loadUser();

//(<HTMLButtonElement>document.getElementById('getData')).onclick = loadData;



(<HTMLButtonElement>document.getElementById('loginBtn')).onclick = loginExsec;
(<HTMLButtonElement>document.getElementById('registerBtn')).onclick = registerExsec;

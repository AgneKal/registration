import { loadUser, loginExsec, registerExsec, showLogin } from "./auth.js";
import { addRegistration } from "./addRegistration.js";
export const registrationData = [];
document.getElementById('changeEmailSection').style.display = 'none';
document.getElementById('changePasswordSection').style.display = 'none';
document.getElementById('addRegistrationBtn').onclick = addRegistration;
export const userInfo = {
    email: '',
    idToken: '',
    loggedin: false,
};
showLogin();
loadUser();
//(<HTMLButtonElement>document.getElementById('getData')).onclick = loadData;
document.getElementById('loginBtn').onclick = loginExsec;
document.getElementById('registerBtn').onclick = registerExsec;

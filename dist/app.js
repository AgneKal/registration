import { loadData } from "./loadData.js";
import { loginExsec, registerExsec } from "./auth.js";
import { addRegistration } from "./addRegistration.js";
export const registrationData = [];
document.getElementById('menu').style.display = "none";
document.getElementById('loginSection').style.display = "flex";
document.getElementById('loginError').style.display = "none";
document.getElementById('dataSection').style.display = "none";
document.getElementById('addRegistrationBtn').onclick = addRegistration;
document.getElementById('getData').onclick = loadData;
export const userInfo = {
    email: '',
    idToken: '',
    loggedin: false,
};
document.getElementById('loginBtn').onclick = loginExsec;
document.getElementById('registerBtn').onclick = registerExsec;

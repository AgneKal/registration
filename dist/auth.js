import { userInfo } from "./app.js";
import { loadData } from "./loadData.js";
function autExec(method) {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyCpRRP95g-fK5ob3qe8XWfE-Q3iAVjaTUM`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('loginEmail').value,
            password: document.getElementById('loginPassword').value,
            returnSecureToken: true
        })
    })
        .then((response) => {
        return response.json();
    })
        .then((data) => {
        if (typeof data.error !== "undefined") {
            if (data.error.message === "EMAIL_EXISTS") {
                throw new Error("Toks el. paštas jau užregistruotas.");
            }
            if (data.error.message === "WEAK_PASSWORD : Password should be at least 6 characters") {
                throw new Error("Slaptažodį turi sudaryti bent 6 simboliai.");
            }
            if (data.error.message === "INVALID_EMAIL") {
                throw new Error("Neteisingas el. paštas.");
            }
            if (data.error.message == "TOO_MANY_ATTEMPTS_TRY_LATER") {
                throw new Error("Viršytas registracijų skaičius, pabandykite dar kartą po valandos.");
            }
            if (data.error.message === "INVALID_LOGIN_CREDENTIALS") {
                throw new Error("Neteisingi prisijungimo duomenys.");
            }
        }
        userInfo.email = data.email;
        userInfo.idToken = data.idToken;
        userInfo.loggedin = true;
        document.getElementById('loginSection').style.display = "none";
        document.getElementById('dataSection').style.display = "flex";
        document.getElementById('menu').style.display = "flex";
        loadData();
    })
        .catch((err) => {
        let errorDiv = document.getElementById('loginError');
        errorDiv.style.display = "flex";
        errorDiv.innerHTML = err.message;
    });
}
export function loginExsec() {
    autExec('signInWithPassword');
}
export function registerExsec() {
    autExec('signUp');
}

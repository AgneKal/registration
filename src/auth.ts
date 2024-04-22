import { userInfo } from "./app.js";
import { loadData } from "./loadData.js";
import { User } from "./user.js";

function autExec (method:string) {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=AIzaSyCpRRP95g-fK5ob3qe8XWfE-Q3iAVjaTUM`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: (<HTMLInputElement>document.getElementById('loginEmail')).value,
            password: (<HTMLInputElement>document.getElementById('loginPassword')).value,
            returnSecureToken: true
        })
    })
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        if(typeof data.error !== "undefined") {
            if (data.error.message === "EMAIL_EXISTS"){
                throw new Error("Toks el. paštas jau užregistruotas.");
            }
            if (data.error.message === "WEAK_PASSWORD : Password should be at least 6 characters"){
                throw new Error("Slaptažodį turi sudaryti bent 6 simboliai.");
            }
            if (data.error.message === "INVALID_EMAIL"){
                throw new Error("Neteisingas el. paštas.");
            }
            if (data.error.message=="TOO_MANY_ATTEMPTS_TRY_LATER"){
                throw new Error("Viršytas registracijų skaičius, pabandykite dar kartą po valandos.");
            }
            if (data.error.message === "INVALID_LOGIN_CREDENTIALS"){
                throw new Error("Neteisingi prisijungimo duomenys.");
            }
            if (data.error.message === "EMAIL_NOT_FOUND"){
                throw new Error("Nėra tokio el. pašto.");
            }
        }
        userInfo.email  = data.email;
        userInfo.idToken = data.idToken;
        userInfo.loggedin = true;
        loadData();
        saveUser();
        hideLogin();
    })
    .catch((err:Error) => {
        let errorDiv = (<HTMLElement>document.getElementById('loginError'));
        errorDiv.style.display = "flex";
        errorDiv.innerHTML = err.message;
    })
}

export function loginExsec() {
    autExec('signInWithPassword');
}

export function registerExsec() {
    autExec('signUp');
}

export function saveUser(){
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
}

export function loadUser(){
    const userStr = localStorage.getItem('userInfo');
    if(userStr != null) {
        const user:User = JSON.parse(userStr);
        userInfo.email = user.email;
        userInfo.idToken = user.idToken;
        userInfo.loggedin = user.loggedin;
        loadData();
        hideLogin();
    }
}

export function showLogin() {
    (<HTMLElement>document.getElementById('loginSection')).style.display = "block";
    (<HTMLElement>document.getElementById('dataSection')).style.display = "none";
    (<HTMLElement>document.getElementById('menu')).style.display = "none";
}

export function hideLogin() {
    (<HTMLElement>document.getElementById('loginSection')).style.display = "none";
    (<HTMLElement>document.getElementById('dataSection')).style.display = "block";
    (<HTMLElement>document.getElementById('menu')).style.display = "block";
}

export function logOut(){
    localStorage.removeItem('userInfo');
    showLogin();
    (<HTMLElement>document.getElementById('loginError')).style.display = "none";
}

export function deleteAccount(){
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyCpRRP95g-fK5ob3qe8XWfE-Q3iAVjaTUM`,{
        method:'POST',
        headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
        },
        body: JSON.stringify({
            idToken: userInfo.idToken
        })
    })
    .then((result) => {
        return result.json();
    })
    .then((data) => {
        logOut();
    })
}

(<HTMLElement>document.getElementById('logOut')).onclick = logOut;
(<HTMLElement>document.getElementById('deleteAccount')).onclick = deleteAccount;

export function updateUser (data:{email?:string, password?:string}) {
     fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCpRRP95g-fK5ob3qe8XWfE-Q3iAVjaTUM`,{
            method:'POST',
            headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
            },
            body: JSON.stringify({
                idToken: userInfo.idToken,
                ...data,
                returnSecureToken: false,
            })
        })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            logOut()
        });
}

(<HTMLElement>document.getElementById('changePassword')).onclick = () => {
    if ((<HTMLElement>document.getElementById('changePasswordSection')).style.display === 'block') {
        (<HTMLElement>document.getElementById('changePasswordSection')).style.display = 'none';
    } else {
        (<HTMLElement>document.getElementById('changePasswordSection')).style.display = 'block';
        
        (<HTMLButtonElement>document.getElementById('changePasswordBtn')).onclick = () => {
            let newPassword = (<HTMLInputElement>document.getElementById('newPassword')).value;
            updateUser({password:newPassword});
            (<HTMLInputElement>document.getElementById('newPassword')).value = '';
            (<HTMLElement>document.getElementById('changePasswordSection')).style.display = 'none';
        }  
    } 
} 

(<HTMLElement>document.getElementById('changeEmail')).onclick = () => {
    if ((<HTMLElement>document.getElementById('changeEmailSection')).style.display === 'block') {
        (<HTMLElement>document.getElementById('changeEmailSection')).style.display = 'none';
    } else {
        (<HTMLElement>document.getElementById('changeEmailSection')).style.display = 'block';
        
        (<HTMLButtonElement>document.getElementById('changeEmailBtn')).onclick = () => {
            const newEmail = (<HTMLInputElement>document.getElementById('newEmail')).value;
            updateUser({email:newEmail});
            (<HTMLInputElement>document.getElementById('newEmail')).value = '';
            (<HTMLElement>document.getElementById('changeEmailSection')).style.display = 'none';
        }  
    } 
} 
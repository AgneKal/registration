import { userInfo } from "./app.js"

export const fetchRegistrations = (path:string, method:string, data: any)=>{
    const options:any = {
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    if (data != null) {
        options.body = JSON.stringify(data);
    }
    return fetch (`https://registration-accea-default-rtdb.europe-west1.firebasedatabase.app/${path}.json?auth=${userInfo.idToken}`, options) 
}
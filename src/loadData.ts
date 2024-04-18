import { Registration } from "./registration.js";
import { fetchRegistrations } from "./fetchData.js";
import { showData } from "./showData.js";
import { registrationData } from "./app.js";

export const loadData=()=> {
    let resultEdit = <HTMLElement>document.getElementById('resultEdit');
    resultEdit.style.display = 'none';
    fetchRegistrations('registrations', 'get', null)
    .then ((response) => {
        return response.json();
    })
    .then ((data:{[key:string]:Registration}) => {
        registrationData.splice(0, registrationData.length);

        Object.keys(data).forEach((k)=>{
            registrationData.push({id:k, ...data[k]});
        })
        showData(registrationData);
    })
}